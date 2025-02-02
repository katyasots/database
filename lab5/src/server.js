const express = require('express');
const queries = require('./unsafe_queries');

const app = express();
const PORT = 3000;

// Endpoint: Get track info
app.get('/track', async (req, res) => {
    try {
      const { trackName } = req.query;

      //if (!trackName) return res.status(400).send({ error: 'trackName query parameter is required' });
      const result = await queries.getTrackInfo(trackName);
      res.json({ trackInfo: result });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: error.message });
    }
  });
  
// Endpoint: Get repertoire of the most popular group
app.get('/most-popular-group-repertoire', async (req, res) => {
  try {
    const result = await queries.getMostPopularGroupRepertoire();
    res.json({ repertoire: result });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

// Endpoint: Get last concert ticket price
app.get('/last-concert-ticket-price', async (req, res) => {
  try {
    const { groupName } = req.query;
    //if (!groupName) return res.status(400).send({ error: 'groupName query parameter is required' });
    const result = await queries.getLastConcertTicketPrice(groupName);
    res.json({ lastConcertTicketPrice: result });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

// Endpoint: Get group members
app.get('/group-members', async (req, res) => {
  try {
    const { groupName } = req.query;
    //if (!groupName) return res.status(400).send({ error: 'groupName query parameter is required' });
    const result = await queries.getGroupMembers(groupName);
    res.json({ members: result });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

// Endpoint: Get group tour info
app.get('/group-tour-info', async (req, res) => {
  try {
    const { groupName } = req.query;
    //if (!groupName) return res.status(400).send({ error: 'groupName query parameter is required' });
    const result = await queries.getGroupTourInfo(groupName);
    res.json({ tourInfo: result });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

// Endpoint: Get anniversary groups
app.get('/anniversary-groups', async (req, res) => {
  try {
    const result = await queries.getAnniversaryGroups();
    res.json({ anniversaryGroups: result });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

// Endpoint: Get anniversary groups for a specific year
app.get('/anniversary-groups-test', async (req, res) => {
  try {
    const { year } = req.query;
    //if (!year) return res.status(400).send({ error: 'year query parameter is required' });
    const result = await queries.getAnniversaryGroupsTest(Number(year));
    res.json({ anniversaryGroupsForYear: result });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

// Endpoint: Get youngest vocalist
app.get('/youngest-vocalist', async (req, res) => {
  try {
    const result = await queries.getYoungestVocalist();
    res.json({ youngestVocalist: result });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// http://localhost:3000/track?trackName=Дворцовый мост
// http://localhost:3000/most-popular-group-repertoire
// http://localhost:3000/last-concert-ticket-price?groupName=Монеточка
// http://localhost:3000/group-members?groupName=The Cure
// http://localhost:3000/group-tour-info?groupName=ЛСП
// http://localhost:3000/anniversary-groups
// http://localhost:3000/anniversary-groups-test?year=2025
// http://localhost:3000/youngest-vocalist 
