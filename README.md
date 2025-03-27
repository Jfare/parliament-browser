# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

# Om appen

Första sidan är bara en länk till en lista med aktiva lagtingsledamöter i enlighet med kravspec.
App/index.tsx

Listan som då är en FlatList finns under
app/members/index.tsx
mappindelningen är i enlighet med Expo Router.

Listans element utnyttjar List, Avatar och Text från react-native-paper.

På samma sida högst upp hittas också en SearchBar från samma bibliotek.

Sökfunktionen i sig fungerar enligt följande steg:

1.  State-hantering för sökfrågan: Variabeln searchQuery skapas med hjälp av useState-hooken för att lagra den aktuella sökfrågan som användaren matar in.

2.  Rendera sökfältet: Komponenten Searchbar från react-native-paper används för att skapa ett sökfält. När användaren skriver i sökfältet uppdateras searchQuery-state:n via onChangeText-prop:en.

3.  Filtrering av medlemmar: Listan över medlemmar filtreras baserat på searchQuery. Detta görs genom att skapa en ny array, filteredMembers, som endast innehåller de medlemmar vars för- eller efternamn matchar sökfrågan (icke skiftlägeskänsligt).

4.  Rendera filtrerad lista: Den filtrerade listan (filteredMembers) renderas sedan i en FlatList, vilket visar de medlemmar som matchar sökkriterierna.

Genom denna process uppdateras listan dynamiskt baserat på användarens inmatning i sökfältet.

Enligt kravspec så visas ledamöternas foton som avatarer i listan, för de som inte har foton visas istället deras initialer som en Avatar.Text.

Klickar man på en avatar så kommer man till en detaljerad vy [id].tszx över den specifika ledamoten.

I den detaljerade vyn finns info från https://api.lagtinget.ax/api/persons.json

Det finns också information om vilken organisation ledamoten tillhör som hämtas från
https://api.lagtinget.ax/api/organizations/ i enlighet med "trevligt-att-ha-krav.

Dock vet jag inte varför samma organisations id ibland visar Landskapsregeringen och ibland deras parti....
