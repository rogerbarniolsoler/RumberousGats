# 🐾 Rumberous Cats

Aquest projecte és el primer mòdul d'una aplicació mòbil nativa desenvolupada amb **React Native** i **Expo**, creat com a pràctica per a l'assignatura de desenvolupament mòbil.

## 📌 Temàtica del Projecte
L'aplicació és un "Showcase" (catàleg d'imatges) inspirat en el disseny de Pinterest, però centrat exclusivament en gats. 

S'ha triat aquesta temàtica perquè permet complir a la perfecció amb els requisits tècnics de la pràctica: 
- Renderització de llistes d'alt rendiment amb dades dinàmiques.
- Gestió i tractament d'imatges remotes (URLs).
- Consum d'una API RESTful real externa ([The Cat API](https://thecatapi.com/)).

## 📱 Funcionament de l'App
L'aplicació és senzilla però molt interactiva, demostrant el domini dels components bàsics (`View`, `Text`, `Image`, `FlatList`, `Pressable`):

1. **Catàleg Principal:** En obrir l'aplicació, es fa una crida a l'API per obtenir una llista aleatòria de gats amb informació de la seva raça. Aquests es mostren en format de targetes (*Cards*).
2. **Targetes Desplegables (Accordion):** Cada targeta té un botó amb una fletxa a la part inferior dreta. En clicar-lo (amb feedback visual gràcies al component `Pressable`), la targeta es desplega per mostrar estadístiques detallades de la raça (Intel·ligència, Afecte i Amigabilitat amb gossos).
3. **Botó de Recàrrega (FAB):** A la part inferior dreta de la pantalla hi ha un "Floating Action Button". En prémer-lo, es fa una nova petició a l'API i es recarrega la pantalla amb una nova llista de gats rumberos.
4. **Interfície Segura:** S'ha utilitzat la llibreria `react-native-safe-area-context` per garantir que el disseny s'adapta perfectament al "Safe Area" dels dispositius moderns (evitant el notch o la barra d'estat), tant a iOS com a Android.

## 🚀 Com executar l'aplicació

Per poder provar aquesta aplicació al teu entorn local, segueix aquests passos:

**1. Prerequisits:**
- Tenir instal·lat [Node.js](https://nodejs.org/) al teu ordinador.
- Tenir l'aplicació **Expo Go** instal·lada al teu dispositiu mòbil (iOS o Android).

**2. Instal·lació:**
Clona aquest repositori al teu ordinador i, des de la terminal, accedeix a la carpeta del projecte per instal·lar les dependències:
- npm install
- npx expo start


***Gaudeix dels 🐾 Rumberous Cats***
