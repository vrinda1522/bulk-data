const { Data } = require('../models');

exports.bulkInsert = async (req, res) => {
  try {
    const data = req.body;

    if (!Array.isArray(data) || data.length === 0) {
      return res.status(400).json({ error: 'Input must be a non-empty array' });
    }
    const invalidEntries = data.filter(entry =>
        !entry.name || !entry.email || !/^\S+@\S+\.\S+$/.test(entry.email) || !entry.age || !/^[0-9]*[1-9][0-9]*$/.test(entry.age)
      );
  
      if (invalidEntries.length > 0) {
        return res.status(400).json({ error: 'Some entries are missing required fields or have invalid format' });
      }

    const inserted = await Data.bulkCreate(data);
    res.status(201).json(inserted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const allData = await Data.findAll();
    res.status(200).json(allData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.bulkDelete = async (req, res) => {
    try {
      const ids = req.body;
  
      if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ error: 'Input must be a non-empty array of IDs' });
      }

      const existingRecords = await Data.findAll({
        where: { id: ids },
        attributes: ['id'],
      });
  
      const existingIds = existingRecords.map(record => record.id);
      const missingIds = ids.filter(id => !existingIds.includes(id));
  
      if (missingIds.length > 0) {
        return res.status(404).json({
          error: 'Some IDs not found',
          missingIds,
        });
      }
  
      const deleted = await Data.destroy({
        where: { id: ids }
      });
  
      res.status(200).json({ message: `${deleted} record(s) deleted` });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  exports.bulkUpdate = async (req, res) => {
    try {
      const updates = req.body;
  
      if (!Array.isArray(updates) || updates.length === 0) {
        return res.status(400).json({ error: 'Input must be a non-empty array of objects with IDs' });
      }
  
      const results = [];
      const idsToUpdate = updates.map(item => item.id).filter(Boolean);

      // Get existing records
      const existing = await Data.findAll({
        where: { id: idsToUpdate },
        attributes: ['id'],
      });
  
      const existingIds = existing.map(e => e.id);
      const missingIds = idsToUpdate.filter(id => !existingIds.includes(id));
  
      if (missingIds.length > 0) {
        return res.status(404).json({
          error: 'Some IDs not found',
          missingIds,
        });
      }
  
  
      for (const item of updates) {
        if (!item.id) continue;
  
        const [rows, updated] = await Data.update(item, {
          where: { id: item.id },
          returning: true
        });
  
        if (rows > 0) results.push(updated[0]);
      }
  
      res.status(200).json({ message: `${results.length} record(s) updated`, data: results });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
