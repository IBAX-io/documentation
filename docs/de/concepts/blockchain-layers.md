# The IBAX Netzwerk {#the-ibax-network}

In diesem Abschnitt werden wir Sie in die Verwendung von IBAX einweisen.

- [The IBAX Netzwerk](#the-ibax-network)
  - [Anwendungsentwickler](#application-developers)
  - [ECOLIB Mitglieder](#ecolib-members)
  - [ECOLIB Anwendungen und Plattformanwendungen](#ecolib-applications-and-platform-applications)
  - [Zugrunde liegendes Modell](#underlying-model)
  - [Implementierung](#implementation)





Wenn Sie an der Entwicklung, Verwendung oder Verwaltung von Anwendungen in IBAX interessiert sind, müssen Sie es möglicherweise überhaupt nicht verstehen.

In IBAX sind die Blockchain und das Blockchain-Netzwerk vor ECOLIB-Mitgliedern, Administratoren und Anwendungsentwicklern verborgen. IBAX bietet für alle Benutzergruppen [RESTful API](../reference/api2.md) an, die einen manipulationssicheren und verteilten Zugriff auf den **globalen Zustand** der Blockchain ermöglichen.

## Anwendungsentwickler {#application-developers}

Technisch gesehen ist der **global state** ein Datensatz, der über die Datenbank von IBAX implementiert wird. Aus der Perspektive von Anwendungsentwicklern interagiert eine Anwendung mit der Datenbank, indem sie Tabellen abfragt, einfügt und aktualisiert.

In IBAX werden Transaktionen in die Blockchain geschrieben, indem verschiedene Verträge implementiert werden. Diese Transaktionen rufen Vertragscodes auf, die von Blockchain-Netzwerkknoten implementiert werden, die den globalen Status (Datenbank) entsprechend aktualisieren.

Für Anwendungsentwickler ist ein Vertrag eine Funktion, dass Daten bei der Implementierung in die Datenbank geschrieben werden. Seiten sind wie Skripte und der Seitencode ist ein Satz von Seitenfunktionen [template](../topics/templates2.md), einige dieser Funktionen zeigen Seitenelemente an, während andere Daten aus der Datenbank stammen. Anwendungsentwickler müssen nicht verstehen, was Transaktionen, Blockgenerierung und Konsensalgorithmen sind, verwenden Sie sie einfach.

## ECOLIB mitglieder {#ecolib-members}

Von Entwicklern geschriebene Anwendungen werden in einer Umgebung namens [ECOLIB](thesaurus.md#ecolib) ausgeführt. Eine Anwendung dient in der Regel einem bestimmten Zweck und erledigt zusammen mit mehreren anderen Anwendungen verschiedene Aufgaben.

Ein Benutzer muss Mitglied einer ECOLIB werden, wenn er auf Anwendungen darin zugreifen möchte, und er kann gleichzeitig Mitglied mehrerer verschiedener ECOLIBs sein.

ECOLIB-Mitglieder können die Datenbank von den Anwendungsseiten aus anzeigen und ändern, genau wie das Ausfüllen von Formularen, das Klicken auf Schaltflächen und das Navigieren durch Seiten in einer gemeinsamen Webanwendung.

## ECOLIB Anwendungen und Plattformanwendungen {#ecolib-applications-and-platform-applications}

Anwendungen können in **ECOLIB-Anwendungen** und **Plattformanwendungen** fallen.

ECOLIB-Anwendungen

Eine ECOLIB-Anwendung implementiert bestimmte einzigartige Funktionen oder Geschäftsprozesse einer ECOLIB, ist aber nur in dieser ECOLIB verfügbar.
Plattformanwendungen

Eine Plattformanwendung gilt für alle ECOLIBs. Jede Anwendung könnte als Plattformanwendung entwickelt werden. IBAX-Entwickler würden Plattformanwendungen bereitstellen, die die Kernfunktionen für ECOLIB-Governance unterstützen, wie z. B. Abstimmung, Benachrichtigung und ECOLIB-Mitgliederrollenverwaltung.

## Liegendes Modell {#underlying-model}

Definition von Schichten

IBAX besteht aus mehreren Schichten:

* Benutzerinteraktionsebene

     ECOLIB-Mitglieder interagieren mit der Anwendung über Seiten und Seitenelemente.

* Anwendungsschicht

     Anwendungsentwickler interagieren mit dem globalen Zustand (Datentabellen) über Vertragscodes und Seitencodes.

* Globale Zustandsebene

     Aktualisieren und synchronisieren Sie den globalen Status (Datenbank) basierend auf Operationen, die in das verteilte Ledger (Blockchain) geschrieben wurden.
* Blockchain-Schicht

     Aktualisieren Sie das Distributed Ledger mit neuen Blöcken. Operationen (Transaktionen), die in neuen Blöcken gespeichert werden, müssen auf dem globalen Zustand durchgeführt werden.

* Knotennetzwerkschicht

     Es implementierte das IBAX-Netzwerkprotokoll, das Transaktionen verteilt, verifiziert und neue Blöcke im Knotennetzwerk generiert. In ähnlicher Weise werden neue Blöcke vom Knotennetzwerk verteilt und verifiziert.

     Das verteilte Hauptbuch aller Knoten wird synchron gehalten. Wenn Konflikte in einem Knoten auftreten, identifiziert der Knoten, welche Blockchains als gültig gelten, und ungültige Blockchains werden entsprechend zurückgesetzt.

* Transaktionsschicht

     Transaktionen sind die Grundlage für die Generierung von Blöcken und Blockchain-Protokollen, und Transaktionen selbst sind die Ergebnisse von Operationen, die auf der Benutzerinteraktionsebene ausgeführt werden. Transaktionen werden von Weaver generiert.

     Wenn ein Benutzer oder Entwickler eine Operation durchführt, z. B. das Klicken auf eine Schaltfläche auf einer Seite oder das Implementieren eines Vertrags aus dem Code-Editor, wandelt Weaver diese Operation in eine Transaktion um und sendet sie an den damit verbundenen Netzwerkknoten.
Daher ist der Transaktionsfluss wie folgt:

   * Eine Benutzeroperation auf einer Benutzerseite wird zu einer Transaktion;
   * Die Transaktion ist in einem Block enthalten;

   * Der Block ist in der Blockchain enthalten;

   * Die Änderung der Operation bewirkt, dass sich der globale Zustand der Blockchain ändert, und diese Operation wird auf die Datenbank angewendet.

   * Jede Datenbankänderung wird in der Anwendung widergespiegelt.
## Implementierung {#implementation}

IBAX besteht aus zwei Hauptkomponenten, nämlich Server [go-ibax](https://github.com/IBAX-io/go-ibax) und Weaver [Quellcode](https://github.com/IBAX-io/weaver ).

Weber:
   * Bereitstellung der Benutzerseiten;
   * Bereitstellung der IDE für die Anwendungsentwicklung;
   * Speichern öffentlicher Schlüssel von Benutzerkonten und Ausführen der Autorisierung;
   * Anfordern von Datenbankdaten von Anwendungsseiten und Anzeigen von Anwendungsseiten für Benutzer;
   * Senden von Transaktionen an den Server über [REST APIs](../reference/api2.md);

       Um automatisch Transaktionen für Benutzeroperationen zu erstellen, wandelt Weaver solche Operationen in Transaktionen um, wenn Anwendungsentwickler einen Vertrag von der IDE implementieren.

Server:
   * Halten des globalen Zustands (Datenbank) des Knotens;
   * Implementierung des Blockchain-Protokolls;
   * Implementierung von Vertragscodes in der IBAX [Virtual Machine](../topics/vm.md);
   * Implementierung von Seitencodes in der [Template Engine](../topics/templates2.md);
   * Implementierung von [RESTful API](../reference/api2.md).