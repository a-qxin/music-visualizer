-- NOTE: I figured we'd want this for the section on SQL
PRAGMA foreign_keys;

-- NOTE: For the SQL assignment, we could have them normalize
-- this database farther. Perhaps they can learn about SERIAL and
-- then go implement a way to change a room_name without losing
-- references by using a FOREIGN KEY into a rooms table with an 
-- int primary key.
CREATE TABLE songs (
	id int NOT NULL PRIMARY KEY,
	song_title text NOT NULL,
	notes varchar NOT NULL,
	artist text NOT NULL,
	album text NOT NULL,
	release_date text NOT NULL 
);

INSERT INTO songs (id, song_title, notes, artist, album, release_date) 
VALUES (1, 'Ode to Joy (Dubstep Remix)', 'E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4 D4 D4', 'Beethoven', 'Mixtape', 'yes');

INSERT INTO songs (id, song_title, notes, artist, album,release_date) 
VALUES (2, 'Never Gonna Give You Up', 'A3 B3 D2 B3 Gb2 Gb2 E2 A3 B3 D4 B3 E4 E4 D4 Db4 B3 A3 B3 D4 B3 D4 E4 Db4 A3 A3 E4 D4', 'Rick Astley', 'Whenever You Need Somebody','7/27/1987');

INSERT INTO songs (id, song_title, notes, artist, album,release_date) 
VALUES (3, 'One Summers Day', 'E3 F3 G3 G3 G3 G3 G3 F3 E3 D3 D3 E3 C3 D3 E3 F3 G3 G3 G3 G3 G3 F3 E3 D3 D3 E3 B2 C3 D3 E3 A2 C3 D3 E3 F3 D3 A3 B3 C4 C4 D4 C4 B3 E3 G3 A3 A3 G3 F3 G3 G3 G3 F3 F3 Eb3 F3 F3 G3 Ab3 G3 Ab3 G3', 'Joe Hishashi', 'Spirited Away','2001');

INSERT INTO songs (id, song_title, notes, artist, album,release_date)
VALUES (4, 'Happy Birthday', 'D4 D4 E4 D4 G4 F4 D4 D4 E4 D4 A4 G4', 'unknown', 'n/a','really old');

INSERT INTO songs (id, song_title, notes, artist, album,release_date)
VALUES (5, 'Shrimps Are Pretty Rich', 'D4 F4 C5 D4 F4 C5 D4 F4 C5 D4 F4 C5 E4 G4 C5 E4 F4 G4 A4 C5', 'Kero Kero Bonito', 'shh#ffb6c1','2014');

INSERT INTO songs (id, song_title, notes, artist, album,release_date)
VALUES (5, 'Twinkle Twinkle Little Star', 'C4 C4 G4 G4 A4 A4 G4', 'unknown', 'n/a','really old');