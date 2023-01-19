context("Search for First 10 Music Genre and find acoustic blues", () => {
  it("search music genre and find acoustic blues", () => {
    cy.request(
      "GET",
      "https://musicbrainz.org/ws/2/genre/all?limit=10&fmt=json"
    ).then((response) => {
      cy.log(JSON.stringify(response));
      expect(response.status).to.eq(200);
      const resultedGenres = response?.body?.genres;
      expect(resultedGenres).to.have.lengthOf(10);
      const foundAcousticBlue = resultedGenres.some((genre) => {
        if (genre.name === "acoustic blues") {
          return true;
        }
        return false;
      });
      expect(foundAcousticBlue).to.have.false;
    });
  });
});
context("Search for First 20 Music Genre and find acoustic blues", () => {
  it("search music genre and find acoustic blues", () => {
    cy.request(
      "GET",
      "https://musicbrainz.org/ws/2/genre/all?limit=20&fmt=json"
    ).then((response) => {
      //cy.log(JSON.stringify(response));
      expect(response.status).to.eq(200);
      const resultedGenres = response?.body?.genres;
      expect(resultedGenres).to.have.lengthOf(20);
      const filteredArray = resultedGenres.filter(
        (item) => item.name === "acoustic blues"
      );
      cy.wrap(filteredArray).should("have.length.greaterThan", 0);
    });
  });
});
context("Search for Madonna and check life-span begin", () => {
  it("find Madonna and check life-span begin", () => {
    cy.request(
      "GET",
      "https://musicbrainz.org/ws/2/artist?query=Madonna&inc=aliases&fmt=json"
    ).then((response) => {
      expect(response.status).to.eq(200);
      const resultedArtists = response?.body?.artists;
      expect(resultedArtists).to.have.length.to.be.greaterThan(1);
      const getMadonna = resultedArtists.filter((artist) => {
        if (artist.name === "Madonna") return artist;
      });
      getMadonna.forEach((artist) => {
        const begin = artist["life-span"]["begin"];
        if (begin) {
          expect(begin).not.to.have.string("1958-06-25");
        }
      });
    });
  });
});
