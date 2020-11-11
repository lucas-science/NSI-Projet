# NSI-Projet
#### Commande pour utiliser **Git**
##### Mise en place de git
- Rend toi dans le dossier où tu veux commencer ton projet dans le terminal (Visual studio Code ou Git Bash).
- Déplace toi dans les fichiers grace à : `cd` + ton dossier `/document/dossierprojet/etc..` et utilise `ls` pour voir les fichier situé dans le dossier où tu te situe.
- Ecrit `git init`.
- Pour se connecter a github grace a git : 
  - `git config --global user.name 'TON_NOM_GITHUB'`
  - `git config --global user.email 'TON_ADRESSE_EMAIL_GITHUB'`
  
##### Utiliser git
- Quand tu es dans ton dossier de travail tu peux faire : `git add .`, pour ajouter tout les fichier dans la listes des choses a sauvegarder.
- Puis tu peux faire `git status`, pour voir les fichier dans la liste de sauvegarde et connaitre dans quel branche tu es, de base tu sera dans la branche `master`.
- Si tu veux suprimer un fichier de la liste de sauvegarde : `git rm --cached index.html`, par exemple.
- Créer une nouvel branche : `git branch` + le nom de la branche voulant être crée, Exemple :  `git branch DevFrontend`.
- Pour se deplacer dans la branche créer, Exemple : `git checkout DevFrontend `.
- Pour connaitre toute les branche actuel : `git branch --list`
- Puis lorsqu'on est dans cette branche (pour être sur utiliser : `git status`), lorsqu'on a un peu bosser on ajoute les fichier avec `git add .` poyur les ajouter a la liste de sauvegarde.
- Pour finir lorsqu'on veut envoyer le travail qu'on a fait pour qu'elle soit sauvegardé on fait , `git commit  -m 'changements effectués'`, obligatoire de dire les changments effectés.







