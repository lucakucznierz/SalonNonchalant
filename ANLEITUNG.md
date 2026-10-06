# Website bearbeiten – Anleitung für die Band

Alle Inhalte der Website (Konzerttermine, Texte, Besetzung, Kontakt, Impressum) stehen in **einer Google-Tabelle**.
Wer die Tabelle bearbeiten darf, kann die Website ändern. Programmierkenntnisse braucht man nicht.

Änderungen erscheinen **sofort**, sobald jemand die Website neu lädt. Speichern ist nicht nötig, Google speichert automatisch.

## Deutsch, Englisch und Französisch

Die Website gibt es auf Deutsch (salon-nonchalant.de), Englisch (salon-nonchalant.de/en/)
und Französisch (salon-nonchalant.de/fr/).
Spalten, deren Name auf **_EN** oder **_FR** endet, enthalten die englische bzw. französische Fassung,
z. B. `Titel_EN`, `Titel_FR` oder `Inhalt_FR`. Fehlt eine Spalte, kann man sie einfach rechts anfügen.

Bleibt eine Übersetzung leer, springt die Website ein:
- Englische Seite: zeigt den deutschen Text.
- Französische Seite: zeigt den englischen Text, und wenn der auch fehlt, den deutschen.

---

## Konzert eintragen

1. Google-Tabelle öffnen und unten den Reiter **Konzerte** wählen.
2. In die erste freie Zeile schreiben:

| Spalte    | Was hinein gehört                                  | Beispiel                         |
|-----------|----------------------------------------------------|----------------------------------|
| Datum     | Datum als **TT.MM.JJJJ** (Pflichtfeld)             | 05.12.2026                       |
| Uhrzeit   | Beginn                                             | 19:30                            |
| Titel     | Name der Veranstaltung                             | Winterball                       |
| Titel_EN  | Englischer Titel (optional)                        | Winter Ball                      |
| Ort       | Name des Veranstaltungsorts                        | Schauburg                        |
| Adresse   | Straße und Stadt (wird zum Google-Maps-Link)       | Musterstraße 1, 12345 Musterstadt |
| Link      | Link zu Tickets oder Infos (optional)              | https://…                        |
| Info      | Kurzer Hinweis (optional)                          | Eintritt frei                    |
| Info_EN   | Englischer Hinweis (optional)                      | Free entry                       |

- Die Reihenfolge der Zeilen ist egal, die Website sortiert nach Datum.
- Vergangene Konzerte rutschen automatisch unter „Vergangene Konzerte“. Ihr müsst nichts löschen.
- Ein Konzert absagen: einfach die Zeile löschen.

## Texte ändern

Reiter **Texte**: In Spalte **Feld** steht, wo der Text auf der Website erscheint. In Spalte **Inhalt** steht der Text selbst.
Nur die Spalte **Inhalt** ändern, die Feldnamen bitte nicht umbenennen.

| Feld                     | Wo auf der Website                                       |
|--------------------------|----------------------------------------------------------|
| slogan                   | Satz unter dem Bandnamen ganz oben                       |
| hero_zeile               | Kleine goldene Zeile über dem Bandnamen                  |
| ueber_titel / ueber_text | Überschrift und Text im Bereich „Die Band“               |
| fakt1_zahl … fakt3_text  | Die drei großen Zahlen unter dem Band-Text               |
| buchen_titel / buchen_text | Booking-Bereich unten                                  |
| email, telefon           | Kontaktknöpfe (leer lassen = Knopf wird ausgeblendet)    |
| instagram, facebook, youtube | Vollständige Links zu euren Profilen (leer = ausgeblendet) |
| impressum, datenschutz   | Inhalt der Seiten Impressum und Datenschutz              |

**Neuer Absatz:** In einer Zelle mit **Strg + Enter** (Mac: **Cmd + Enter**) eine neue Zeile beginnen.

**Tipp für Google:** Erwähnt in den Texten ruhig, dass ihr aus **Leipzig** kommt (z. B. „Bigband aus Leipzig“).
So findet man euch leichter, wenn jemand nach „Bigband Leipzig“ oder „Swing Band Leipzig“ sucht.

## Besetzung ändern

Reiter **Besetzung**: eine Zeile pro Register (z. B. Saxophone).
Die Spalte **Foto** enthält den Namen eines Fotos (z. B. `img-6675`). Leer lassen, wenn kein Foto gezeigt werden soll.

## Mitglieder vorstellen

Klickt man auf der Website auf ein Register (z. B. Saxophone), klappen darunter die Mitglieder auf.
Sie stehen im Reiter **Mitglieder**, eine Zeile pro Person:

| Spalte        | Was hinein gehört                                                     | Beispiel           |
|---------------|-----------------------------------------------------------------------|--------------------|
| Register      | Genau wie im Reiter **Besetzung** geschrieben                         | Saxophone          |
| Name          | Name, wie er auf der Website stehen soll (Pflichtfeld)               | Anna Muster        |
| Instrument    | Instrument                                                            | Altsaxophon        |
| Instrument_EN | Instrument auf Englisch (optional)                                    | Alto saxophone     |
| Info          | Ein, zwei Sätze über die Person (optional)                            | Spielt seit 2015 … |
| Info_EN       | Dasselbe auf Englisch (optional)                                      | Has played since … |
| Foto          | Link zum Foto (optional, siehe unten)                                 |                    |

Die Reihenfolge der Zeilen ist auch die Reihenfolge auf der Website. Ohne Foto erscheinen die Initialen.

**Foto hinzufügen:**
1. Foto in Google Drive hochladen (am besten in einen gemeinsamen Ordner „Website-Fotos“).
2. Rechtsklick auf das Foto → **Teilen** → „Allgemeiner Zugriff“: **Jeder mit dem Link** → **Link kopieren**.
3. Den Link in die Spalte **Foto** einfügen.

Am besten eignen sich quadratische Fotos oder Porträts, auf denen das Gesicht mittig ist.
Bitte nur Fotos von Personen verwenden, die mit der Veröffentlichung einverstanden sind.

## Wenn etwas nicht stimmt

- **Ein Konzert fehlt?** Meist ist das Datum falsch geschrieben. Es muss so aussehen: `05.12.2026`.
- **Die ganze Seite zeigt nur Beispieltexte?** Dann ist die Tabelle nicht mehr für „Jeder mit dem Link“ freigegeben,
  oder ein Reiter wurde umbenannt. Die Reiter müssen genau **Konzerte**, **Texte**, **Besetzung** und **Mitglieder** heißen.
- **Ein Foto erscheint nicht, nur Initialen?** Dann ist das Foto in Google Drive nicht für „Jeder mit dem Link“ freigegeben.
- **Eine Person fehlt beim Register?** Der Eintrag in der Spalte **Register** muss genau wie im Reiter **Besetzung** geschrieben sein.
- Google speichert einen Versionsverlauf: **Datei → Versionsverlauf** stellt einen früheren Stand wieder her.

Neue Fotos oder Änderungen am Design macht jemand mit Zugriff auf den Code (siehe `README.md`).
