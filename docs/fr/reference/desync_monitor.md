# Outil de surveillance synchronisée {#synchronized-monitoring-tool}

Desync_monitor est un outil spécial qui peut être utilisé pour vérifier si la base de données sur le nœud spécifié a été synchronisée.

L'outil peut être utilisé comme un démon ou peut être lancé pour effectuer une vérification ponctuelle.

Le principe de fonctionnement de l'outil est basé sur ce qui suit :

1. Chaque bloc contient le hachage de toutes les modifications de toutes les transactions, demandez au nœud spécifié de fournir son dernier ID de bloc ;
2. Ensuite, demandez un bloc avec cet ID à tous les nœuds et comparez les hachages ci-dessus ;
3. Si les hachages sont différents, un message d'erreur de synchronisation sera envoyé à l'adresse e-mail spécifiée dans la commande.

## Emplacement {#location}

L'outil est situé dans le répertoire `tools/desync_monitor/`.

## Drapeaux de la ligne de commande {#command-prompt-flags}

Les drapeaux suivants peuvent être utilisés depuis l'invite de commande :

> -   **confPath** -- Chemin du fichier de configuration. Le nom de fichier par défaut est `config.toml`;
> -   **nodesList** -- Liste des nœuds du bloc demandé, séparés par des virgules. La valeur par défaut est `127.0.0.1:7079`;
> -   **daemonMode** -- Démarré en tant que démon et doit être utilisé lorsque l'authentification est requise toutes les N secondes. Ce drapeau est par défaut défini sur `false`;
> -   **queryingPeriod** -- Si l'outil est démarré en tant que démon, ce paramètre définit l'intervalle de temps (en secondes) entre les vérifications, `1` seconde par défaut.

-   **alertMessageTo** -- L'adresse e-mail à laquelle les erreurs de synchronisation seront envoyées.

    > -   **alertMessageSubj** -- Sujet du message dans le message d'avertissement, le problème de `synchronisation du nœud` par défaut;
    > -   **alertMessageFrom** -- Adresse à partir de laquelle le message a été envoyé.
    > -   **smtpHost** -- Hôte du serveur SMTP utilisé pour envoyer des e-mails, `""` par défaut;
    > -   **smtpPort** -- Port du serveur SMTP utilisé pour envoyer des messages électroniques, `25` par défaut;
    > -   **smtpUsername** -- Nom d'utilisateur du serveur SMTP, `""` par défaut;
    > -   **smtpPassword** -- Mot de passe du serveur SMTP, `""` par défaut.

## Configuration {#configuration}

L'outil utilise un fichier de configuration au format toml.

Par défaut, il recherchera le fichier config.toml dans le dossier où démarrer le fichier binaire.

Le chemin du fichier peut être modifié avec **configPath**.

```text
nodes_list = ["http://127.0.0.1:7079", "http://127.0.0.1:7002"]

[daemon]
daemon = false
querying_period = 1

[alert_message]
to = ""
subject = "problem with xxx nodes"
from = ""

[smtp]
host = ""
port = 25
username = ""
password = ""
```

### nodes_list {#nodes-list}

* nodes_list - Liste des nœuds (hôtes) demandant des informations.

### [daemon] {#daemon}

Configuration du mode démon.

> -   **daemon_mode** -- Un outil fonctionne comme un démon et effectue des vérifications de synchronisation.
> -   **querying_period** -- Intervalle de temps entre les vérifications de synchronisation.

### [alert_message] {#alert-message}

Paramètres du message d'avertissement.

> -   **to** -- Destinataire des messages d'avertissement d'erreur de synchronisation ;
> -   **subject** -- sujet du message;
> -   **from** -- e-mail de l'expéditeur.

### [smtp] {#smtp}

Paramètres du serveur de protocole de transfert de courrier simple (SMTP), utilisés pour envoyer des messages d'erreur de synchronisation.

> -   **host** -- Serveur SMTP hébergé;
> -   **port** -- Port du serveur SMTP;
> -   **username** -- Nom d'utilisateur du serveur SMTP;
> -   **password** -- Mot de passe du serveur SMTP;
