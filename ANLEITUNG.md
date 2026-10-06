# Website bearbeiten – Anleitung für die Band

Alle Inhalte der Website (Konzerttermine, Texte, Besetzung, Kontakt, Impressum) stehen in **einer Google-Tabelle**.
Wer die Tabelle bearbeiten darf, kann die Website ändern. Programmierkenntnisse braucht man nicht.

Änderungen erscheinen **sofort**, sobald jemand die Website neu lädt. Speichern ist nicht nötig, Google speichert automatisch.

---

## Konzert eintragen

1. Google-Tabelle öffnen und unten den Reiter **Konzerte** wählen.
2. In die erste freie Zeile schreiben:

| Spalte    | Was hinein gehört                                  | Beispiel                         |
|-----------|----------------------------------------------------|----------------------------------|
| Datum     | Datum als **TT.MM.JJJJ** (Pflichtfeld)             | 05.12.2026                       |
| Uhrzeit   | Beginn                                             | 19:30                            |
| Titel     | Name der Veranstaltung                             | Winterball                       |
| Ort       | Name des Veranstaltungsorts                        | Schauburg                        |
| Adresse   | Straße und Stadt (wird zum Google-Maps-Link)       | Musterstraße 1, 12345 Musterstadt |
| Link      | Link zu Tickets oder Infos (optional)              | https://…                        |
| Info      | Kurzer Hinweis (optional)                          | Eintritt frei                    |

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

## Besetzung ändern

Reiter **Besetzung**: eine Zeile pro Register (z. B. Saxophone).
Die Spalte **Foto** enthält den Namen eines Fotos (z. B. `img-6675`). Leer lassen, wenn kein Foto gezeigt werden soll.

## Wenn etwas nicht stimmt

- **Ein Konzert fehlt?** Meist ist das Datum falsch geschrieben. Es muss so aussehen: `05.12.2026`.
- **Die ganze Seite zeigt nur Beispieltexte?** Dann ist die Tabelle nicht mehr für „Jeder mit dem Link“ freigegeben,
  oder ein Reiter wurde umbenannt. Die Reiter müssen genau **Konzerte**, **Texte** und **Besetzung** heißen.
- Google speichert einen Versionsverlauf: **Datei → Versionsverlauf** stellt einen früheren Stand wieder her.

Neue Fotos oder Änderungen am Design macht jemand mit Zugriff auf den Code (siehe `README.md`).
