# 🐾 Rumberous Cats

Aquest projecte és el primer mòdul d'una aplicació mòbil nativa desenvolupada amb **React Native** i **Expo**, creat com a pràctica per a l'assignatura de desenvolupament mòbil.

## 📌 Temàtica del Projecte
L'aplicació és un "Showcase" (catàleg d'imatges) centrat exclusivament en gats. 

S'ha triat aquesta temàtica perquè permet complir a la perfecció amb els requisits tècnics de la pràctica: 
- Renderització de llistes d'alt rendiment amb dades dinàmiques.
- Gestió i tractament d'imatges remotes (URLs).
- Consum d'una API RESTful real externa ([The Cat API](https://thecatapi.com/)).

## 📱 Funcionament de l'App (v2)
L'aplicació ha evolucionat d'un catàleg estàtic a una experiència multimodal i animada, integrant les següents funcionalitats:

### 1. Navegació i Arquitectura
* **Expo Router:** S'ha implementat una estructura de navegació basada en carpetes amb **Tabs** inferiors (Home, Likes i Perfil).
* **Vistes en Stack:** Ús de sistemes de pila per gestionar la transició entre la llista i el detall.

### 2. Detall en Modal i Shared Element Transition
* **Modal Natiu:** En clicar una targeta, s'obre una vista de detall en format modal que puja de baix a dalt.
* **Shared Element Transition:** La imatge del gat realitza una transició fluida (vola) de la llista al detall, garantint una continuïtat visual de "Motion Design".

### 3. Sistema de "Likes" amb Context API
* **Persistència Global:** S'ha utilitzat **React Context** per gestionar els gats preferits de forma global sense dependre de bases de dades externes.
* **Feedback Visual:** El botó del cor inclou una animació suau de tipus "pop" (batec ràpid) utilitzant `withSequence` per confirmar l'acció a l'usuari.

### 4. Experiència Multimodal: Gestos i Música
* **Long Press Gesture:** En mantenir premuda una targeta, s'activa un gest complex (Gesture Handler) que reprodueix en bucle la cançó *"Gat Rumbero"* de La Pegatina.
* **Animació Bategant:** Mentre el so està actiu, la targeta realitza una animació d'escala infinita (`withRepeat`), sincronitzant la resposta visual amb l'àudio.
* **Threading:** S'ha utilitzat `runOnJS` per garantir que la reproducció multimèdia no bloquegi el fil d'animacions de la UI.

## 🚀 Com executar l'aplicació

Per poder provar aquesta aplicació al teu entorn local, segueix aquests passos:

**1. Prerequisits:**
- Tenir instal·lat [Node.js](https://nodejs.org/) al teu ordinador.
- Tenir l'aplicació **Expo Go** instal·lada al teu dispositiu mòbil (iOS o Android).

**2. Instal·lació:**
Clona aquest repositori al teu ordinador i, des de la terminal, accedeix a la carpeta del projecte per instal·lar les dependències:
- npm install
- npx expo start
- Escanejar el QR


***Gaudeix dels 🐾 Rumberous Cats***
