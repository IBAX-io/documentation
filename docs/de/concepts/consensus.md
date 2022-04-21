# Dezentraler Proof-of-Authority-Konsens

* Was ist ein Konsens über einen dezentralen Berechtigungsnachweis?

* Vorteile des DPoA-Konsenses

* DPoA-Konsens und gemeinsame Angriffsmittel

* Implementierung des DPoA-Konsenses in IBAX

In diesem Abschnitt beschreiben wir den Konsens zum dezentralen Proof-of-Authority und seine Implementierung in IBAX.


 - [Was ist ein dezentraler Proof-of-Authority-Konsens?](#was-ist-ein-dezentraler-proof-of-authority-konsens?)
  - [Vorteile des DPoA-Konsenses](#vertoile-des-dpoa-konsensus)
  - [DPoA consensus and common means of attack](#dpoa-consensus-and-common-means-of-attack)
    - [DoS](#dos)
    - [51 percent attack](#percent-attack-51)
  - [Implementation of DPoA consensus in IBAX](#implementation-of-dpoa-consensus-in-ibax)
    - [Honor-Knoten](#honor-knoten)
    - [Leader-Knoten](#leader-knoten)
    - [Generierung neuer Blöcke](#generation-of-new-blocks)
    - [Gabeln](#gabeln)

## Was ist ein dezentraler Proof-of-Authority-Konsens?

Unter Berücksichtigung kommerzieller Anwendungsszenarien und realer Umgebungen hat IBAX Network einen neuen Konsensmechanismus entwickelt, DPoA (Decentralized Proof of Authority).

Dezentralisierung war schon immer unsere feste Überzeugung. Es bezieht sich nicht nur auf die Infrastruktur-Netzwerkumgebung von IBAX. Stattdessen werden wir die Dezentralisierung in jeder im IBAX-Netzwerk erstellten ecoLib verwurzeln lassen und technische Lösungen verwenden, um in jeder von ihnen ein hohes Maß an Selbstverwaltung zu erreichen. Zum Zweck der hochgradig verteilten Selbstverwaltung haben wir viele Änderungen in der Gesamtarchitektur und der technischen Umsetzung vorgenommen. In der Praxis kommen wir jedoch um das Konzept der zentralen Verwaltung nicht herum. Um ein Gleichgewicht zwischen Zentralisierung und Dezentralisierung zu finden, haben wir neben dem DPoA-Konsensmechanismus auch bestimmte Belohnungs- und Anreizprogramme formuliert.

IBAX Network hat einen neuen Konsensmechanismus geschaffen, der Verteilung, schwache Zentralisierung und eine Zertifizierungsstelle kombiniert. Wir nennen es DPoA (Decentralized Proof of Authority). Um die Kontinuität für das gesamte IBAX-Netzwerk zu gewährleisten, umfasst der Konsens nicht nur das IBAX Public Network, sondern auch ecoLibs, die von jedem Benutzer und jeder Benutzergruppe erstellt wurden. Dadurch entsteht eine wirklich selbstverwaltete, dezentrale, faire, transparente und betrugssichere Decentralized Autonomous Organization (DAO).

DPoA verfügt über einen Präventionsmechanismus gegen Netzwerkangriffe und ermöglicht die Erstellung von Mint Nodes, die das Netzwerk schützen und neue IBXC-Coins prägen. IBAXCoin-Inhaber können einen Teil ihres IBXC-Liquiditätsguthabens in Mint Nodes für Mint & Stake Emission Rewards einsetzen. Das Prägen und Abstecken dient dazu, die Kosten und die Schwierigkeit von Angriffen zu erhöhen und den Gesamtwert der IBXC-Münzen proportional zu erhöhen. Mit diesem Mechanismus sind die Wahrscheinlichkeit und der Schaden jedes Angriffs unendlich nahe bei Null.

## Vorteile des DPoA-Konsenses

Im Vergleich zum Proof-of-Work (PoW)- oder Proof-of-Stake (PoS)-Konsens hat der DPoA-Konsens folgende Vorteile:

* Keine Hochleistungshardware erforderlich. Im Vergleich zum PoW-Konsens verbrauchen Knoten, die den DPoA-Konsens implementieren, keine Rechenressourcen zum Lösen komplexer mathematischer Logikaufgaben;

* Das Zeitintervall zum Generieren neuer Blöcke ist vorhersehbar, aber das für PoW- und PoS-Konsens sind unterschiedlich;

* Hohe Transaktionsrate. Blöcke werden nacheinander in festgelegten Zeitintervallen von autorisierten Netzwerkknoten generiert, was die Geschwindigkeit der Transaktionsverifizierung erhöht.

* Toleranz gegenüber kompromittierten und bösartigen Knoten, solange 51 % der Knoten nicht kompromittiert sind. IBAX implementiert einen Mechanismus zum Sperren von Knoten und Widerrufen von Rechten zur Blockgenerierung.

## DPoA-Konsens und gemeinsame Angriffsmittel

### DoS

Ein Angreifer kann große Mengen an Transaktionen und Blöcken an einen Zielknoten im Netzwerk senden und versuchen, dessen Betrieb zu stören und seine Dienste nicht verfügbar zu machen.

Der DPoA-Mechanismus ist zur Abwehr von DoS-Angriffen möglich:

* Da Netzwerkknoten vorab authentifiziert werden, können Blockgenerierungsrechte nur Knoten gewährt werden, die DoS-Angriffen standhalten können.

* Wenn ein Ehrenknoten für einen bestimmten Zeitraum nicht verfügbar ist, kann er von der Liste der Ehrenknoten ausgeschlossen werden.

### <spn id = "percent-attack-51">51 percent attack</span>

Was das Szenario mit dem DPoA-Konsens betrifft, erfordert der 51-%-Angriff, dass ein Angreifer die Kontrolle über 51 % der Netzwerkknoten erlangt. Aber das Szenario für den PoW-Konsens ist anders, den ein Angreifer benötigt, um 51 % der Rechenleistung des Netzwerks zu erhalten. Die Kontrolle über Knoten in einem zugelassenen Blockchain-Netzwerk zu erlangen, ist viel schwieriger als die Erlangung der Rechenleistung.

Beispielsweise kann ein Angreifer in einem Netzwerk, das den PoW-Konsens implementiert, die Rechenleistung (Leistung) des kontrollierten Netzwerksegments erhöhen und somit den Prozentsatz der kontrollierten Knoten erhöhen. Dies macht für den DPoA-Konsens keinen Sinn, da die Rechenleistung des Knotens keinen Einfluss auf die Blockchain-Netzwerkentscheidungen hat.

## Implementierung des DPoA-Konsenses in IBAX

### Honor-knoten

In IBAX können nur Ehrenknoten neue Blöcke generieren, die das Blockchain-Netzwerk und das verteilte Hauptbuch aufrechterhalten.

Die Liste der Ehrenknoten wird in der Blockchain-Registrierung geführt. Die Reihenfolge der Knoten bestimmt die Reihenfolge, in der Knoten neue Blöcke erzeugen.

### Leader-Knoten

Die folgende Formel bestimmt den aktuellen **Leader-Knoten**, also einen Knoten, der zum aktuellen Zeitpunkt einen neuen Block erzeugen muss.
```
leader = ((time - first) / step) % nodes
```

> Führer

Aktueller Führungsknoten.

> Zeit

Aktuelle Uhrzeit (UNIX).

> zuerst

Generierungszeit des ersten Blocks (UNIX).

> Schritt

Anzahl der Sekunden im Blockgenerierungsintervall.

> Knoten

Gesamtzahl der Ehrenknoten.

### Generierung neuer Blöcke

Neue Blöcke werden durch einen [Leader-Knoten] (#Leader-Node) des aktuellen Zeitintervalls generiert. Bei jedem Zeitintervall wird die Führungsrolle an den nächsten Ehrenknoten aus der Liste der Ehrenknoten weitergegeben.
![avatar](/block-generation.png)

a) Schritte zur Generierung neuer Blöcke

Die Hauptschritte zum Generieren eines neuen Blocks sind wie folgt:

1. Sammelt alle neuen Transaktionen aus der Transaktionswarteschlange des Knotens;

2. Führt Transaktionen einzeln aus. Ungültige oder nicht ausführbare Transaktionen werden zurückgewiesen;

3. Prüft, ob die [Blockgenerierungsgrenzen](../reference/platform-parameters.md#configure-the-generation-of-blocks) konform sind;

4. Generiert einen Block mit gültigen Transaktionen und signiert ihn mit dem privaten Schlüssel des Ehrenknotens durch den ECDSA-Algorithmus;

5. Sendet diesen Block an andere Ehrenknoten.

b) Überprüfung neuer Blöcke

Schritte zum Verifizieren neuer Blöcke auf anderen Ehrenknoten:

1. Empfangen Sie einen neuen Block und überprüfen Sie:

     – ob der neue Block vom Leader-Knoten eines aktuellen Intervalls generiert wurde;

     – ob es keine anderen Blöcke gibt, die vom Leader-Knoten eines aktuellen Intervalls generiert werden;

     – ob der neue Block richtig signiert ist.

2. Führen Sie Transaktionen aus dem Block einzeln aus. Überprüfen Sie, ob die Transaktionen erfolgreich und innerhalb der [Blockgenerierungsgrenzen](../reference/platform-parameters.md#configure-the-generation-of-blocks) ausgeführt werden.

3. Fügen Sie den Block hinzu oder lehnen Sie ihn ab, abhängig vom vorherigen Schritt:

     – Wenn die Blockvalidierung erfolgreich ist, fügen Sie den neuen Block zur Blockchain des aktuellen Knotens hinzu;

     – Wenn die Blockvalidierung fehlgeschlagen ist, lehnen Sie den Block ab und senden Sie eine **Bad Block**-Transaktion;

     – Wenn der Ehrenknoten, der diesen ungültigen Block erstellt hat, weiterhin fehlerhafte Blöcke generiert, kann er gesperrt oder von der Liste der Ehrenknoten ausgeschlossen werden.

### Gabeln

Ein **Fork** ist eine alternative Version der Blockchain, die einen oder mehrere Blöcke enthält, die unabhängig vom Rest der Blockchain generiert wurden.

Forks treten normalerweise auf, wenn ein Teil des Netzwerks desynchronisiert wird. Faktoren, die wahrscheinlich zu Forks führen, sind hohe Netzwerklatenz, absichtliche oder unbeabsichtigte Verletzung von Zeitlimits, Zeitdesynchronisierung an Knoten. Wenn Netzwerkknoten eine signifikante geografische Verteilung haben, muss das Blockgenerierungsintervall erhöht werden.

Forks werden aufgelöst, indem die längste Blockchain-Regel befolgt wird. Wenn zwei Blockchain-Versionen erkannt werden, setzen die Honor-Knoten die kürzere zurück und akzeptieren die längere.

![avatar](/block-fork-resolution.png)