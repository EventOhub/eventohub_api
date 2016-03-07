CREATE TABLE countries(
	country_id int NOT NULL AUTO_INCREMENT,
	country varchar(255) NOT NULL,
	PRIMARY KEY (country_id)
)

Insert into countries(country) values('india');

CREATE TABLE states(
	state_id int NOT NULL AUTO_INCREMENT,
	state varchar(255) NOT NULL,
	country_id int NOT NULL,
	PRIMARY KEY (state_id),
	CONSTRAINT fk_state_country_id
	    FOREIGN KEY (country_id)
	    REFERENCES countries (country_id)
	    ON DELETE CASCADE
)

insert into states(state, country_id) values('Maharashtra', 1), ('Punjab', 1), ('Uttar Pradesh', 1), ('Rajasthan', 1);

CREATE TABLE cities(
	city_id int NOT NULL AUTO_INCREMENT,
	city varchar(255) NOT NULL,
	state_id int NOT NULL,
	PRIMARY KEY (city_id),
	CONSTRAINT fk_city_country_id
	    FOREIGN KEY (state_id)
	    REFERENCES states (state_id)
	    ON DELETE CASCADE
)

insert into cities(city, state_id) values('Pune', 1), ('Mumbai', 1), ('kohlapur', 1), ('Solapur', 1);