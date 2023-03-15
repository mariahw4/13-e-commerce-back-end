const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// this route finds all tags and includes associated product data
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{model: Product, through: ProductTag}] ,
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// this route finds a single tag by ID and displays any relevant associated product data
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{model: Product}],
    });
    if (!tagData) {
      res.status(404).json({message: 'No tag found with that id!'});
      return;
    }
    res.status(200).json(tagData);
  } catch (err){
    res.status(500).json(err);
  }
});

// this route creates a new tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// this route allows a tag with a specific ID to have name updated
router.put('/:id', async (req, res) => {
  try {
  const tagData = await Tag.update(
      {
        tag_name: req.body.tag_name
      },
      {
        where: {
        id: req.body.id,
      },
    });
    if (!tagData) {
      res.status(404).json({message: 'No tag with this id!'});
      return;
    }
    res.status(200).json(tagData);
  } catch(err) {
    res.status(500).json(err);
  }
});

// this route allows a tag with a specific ID to be deleted
router.delete('/:id', async(req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      }
    });
  if (!tagData) {
    res.status(404).json({message: 'No tag found with that id!'});
    return;
  }
  res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
