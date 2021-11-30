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

DROP TABLE IF EXISTS songs;

CREATE TABLE playlists (
	id int NOT NULL PRIMARY KEY,
	playlists_title text NOT NULL,
	song_count int NOT NULL,
	playlist_creator text NOT NULL
);

INSERT INTO songs (id, song_title, notes, artist, album, release_date) 
VALUES (1, 'Ode to Joy (Dubstep Remix)', 'E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4 D4 D4', 'Beethoven', 'Mixtape', 'yes');

INSERT INTO songs (id, song_title, notes, artist, album,release_date) 
VALUES (2, 'Ode to Joy', 'E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4 D4 D4', 'Beethoven', 'Mixtape','pain');