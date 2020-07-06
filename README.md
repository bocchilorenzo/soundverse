# Soundverse

Soundverse è un'applicazione a singola pagina realizzata con Vue.js e Vuetify. I contenuti sono forniti dall'API di Deezer e last.fm. Lo scopo di Soundverse è di fornire una piattaforma di scoperta e discussione di album musicali che permette agli utenti di tenere traccia degli album ascoltati, dare un rating, recensirli e scoprirne di nuovi, seguire altri utenti e scoprire cosa questi ascoltano.

## Viste e componenti

### Viste

-   Home.vue contenente le classifiche mondiale, italiana e le top hits
-   login.vue che a seconda della route mostra il componente ‘formLogin.vue’ (per effettuare login) o ‘formSignup.vue’ (per effettuare la registrazione)
-   albumView.vue che mostra informazioni sull’album selezionato e permette all’utente (se loggato) di aggiungere tale album al db su Firebase a una personale lista di ‘preferiti’, ’ascoltati’ o ‘daAscoltare’; tale view permette inoltre di ascoltare uno snippet di 30 secondi di qualsiasi traccia dell’album, inserire una recensione o un voto da 0.5 a 5 di tale album e leggere recensioni altrui
-   albumUtente.vue serve a mostrare la lista con scroll infinito delle raccolte personali (ascoltati, preferiti, daAscoltare) ancora una volta a seconda della route
-   artistView.vue permette di visualizzare tutti gli album di un artista e scoprire gli artisti simili tramite l’API di Last.fm
-   generi.vue è una sezione per scoprire nuovi album a seconda del genere musicale, i quali sono mostrati tramite delle card con immagine e testo
-   genere.vue mostra invece la classifica e le nuove uscite del genere precedentemente selezionato in generi.vue
-   profile.vue mostra il proprio profilo con i seguaci e seguiti mostrati tramite dialog e permette di inserire o cambiare la propria foto profilo, conservata nello storage di Firebase
-   profiloAltri.vue mostra il profilo di un altro utente, il quale si può seguire o smettere di seguire (a seconda del controllo su Firebase), del quale si possono visualizzare i seguiti e i seguaci, oltre alle raccolte ascoltati, preferiti, daAscoltare di tale utente
-   searchView.vue viene visualizzata quando si effettua una ricerca; tale view è divisa in 3 tab: album (visualizzati tramite un grid di card), artisti (visualizzati tramite un grid di cardArtisti) e utenti (visualizzati tramite una normale list)
-   listView.vue mostra le liste con scroll infinito come le classifiche top 100 (o come sviluppo futuro le liste degli altri utenti)
-   impostazioni.vue contiene informazioni generali sul progetto e l’interruttore per il cambio del tema da chiaro a scuro e viceversa

### Componenti

-   card = card utilizzata per mostrare i dettagli degli album nelle varie viste (tranne albumView)
-   cardArtisti = card utilizzata per mostrare il nome e la foto dell’artista nella ricerca e nella sezione degli artisti correlati nella vista artistView
-   cardcontainer = container delle card per gli album. Utilizzato per avere un unico contenitore riutilizzabile in varie parti dell’app
-   cardcontainerartisti = come il container precedente, solo che è utilizzato per le card degli artisti
-   cardContainerFirebase = simile a cardcontainer per la parte del template, ma viene utilizzato in maniera diversa per quanto riguarda le funzionalità. Viene utilizzato nella view profiloAltri e preleva gli album da Firebase anziché dalle API di Deezer
-   carousel = componente utilizzato nella homepage per mostrare una parte degli album delle relative liste
-   formLogin = form per il login, utilizzata nella vista login
-   formSignup = form per la registrazione, utilizzata anch’essa nella vista login
-   musicplayer = contenitore del player, gestisce l’invio allo stesso del file
-   searchbar = barra di ricerca inserita nella top bar
-   userList = elemento che contiene immagine e username di un utente, preleva i dati da Firebase
-   usersContainer = container per gli utenti, utilizzato nella ricerca e nel profiloAltri, oltre che nel proprio profilo se necessario
-   vuetify-audio = interfaccia del player musicale che viene utilizzato per l’ascolto delle preview da 30 secondi delle varie canzoni negli album. Questo componente è stato creato da [wilsonwu](https://github.com/wilsonwu/vuetify-audio) e cambiato in aspetto e funzionalità per adattarsi meglio allo stile e alle esigenze dell’app

## Funzionalità

L’utente può cercare album, artisti e altri utenti. Gli album possono essere aggiunti a tre diverse collezioni:

-   ascoltati
-   da ascoltare
-   preferiti
    Può inoltre dare un voto e inserire una recensione, oltre a poter ascoltare uno snippet di 30 secondi di qualsiasi traccia. La recensione è anche modificabile e cancellabile.
    Gli utenti possono anche seguirsi tra loro, oltre che visualizzare gli album nelle collezioni dell'altro e l'elenco di utenti da cui sono seguiti o che seguono.
    Sia un utente autenticato sia non autenticato possono cambiare il tema dell’app da scuro a chiaro o viceversa.

## Scelte di sviluppo

-   scrolling infinito = utile per caricare album ogni volta che l’utente sta raggiungendo la fine della lista corrente. Abbiamo deciso di lanciare il caricamento di nuovi album un pò prima di raggiungere la fine esatta, in modo da rendere il caricamento meno ovvio e più user-friendly
-   snackbar = per mostrare all’utente errori o dei messaggi di successo (es. “Login effettuato”), abbiamo scelto di utilizzare una snackbar. Questa scelta deriva da uno studio precedente della documentazione di material, che ci ha portato a preferire la snackbar rispetto a un semplice alert
-   cambio tema = per la modifica del tema, salviamo la preferenza nel localstorage. In questo modo la scelta rimane ed evitiamo di doverla far rifare all’utente
-   utilizzo del localstorage anziché dei cookie = essendo l’utente un oggetto abbastanza complesso, abbiamo pensato di utilizzarlo in localstorage poiché la gestione risulta semplificata e non ci serve inviare le informazioni che salviamo con le varie richieste HTTP
