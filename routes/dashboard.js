const express = require('express');
const router = express.Router();
const Dashboard = require('../models/Dashboard');

router.get('/', async (req, res, next) => {
  try {
    const dashboards = await Dashboard.find().populate('boss_id', 'name');
    res.json(dashboards);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    // id 값이 유효한지 체크
    if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }

    const dashboard = await Dashboard.findOne({ boss_id: id }).populate({
      path: 'boss_id',
      select: 'name',
    });

    if (!dashboard) {
      return res.status(404).json({ error: 'Dashboard not found' });
    }

    res.status(200).json(dashboard);
  } catch (error) {
    // 전체 오류 로그를 확인
    console.error(error);
    res
      .status(500)
      .json({ error: error.message || 'An unexpected error occurred' });

  }
});

module.exports = router;
