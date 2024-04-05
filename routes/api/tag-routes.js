const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// get all tags route
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err)
  }
});

// get tag by ID route
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
// 404 erorr if tag with specified ID doesn't exist
    if(!tagData) {
      res.status(404).json({ message: `No tag with id of ${req.params.id} found!` });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // req.body should look like this...
  // {
  // tag_name: "string here"
  // }
  try {
    const tagData = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(tagData);
    } catch (err) {
      res.status(400).json(err)
    }
});

// update tag by id, body must include updated tag name
router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  //  req.body should look like this...
  // {
  // tag_name: "new tag name here"
  // }
  try {
    const tagData = await Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
// 404 error if tag with specified ID doesn't exist
    if (!tagData) {
      res.status(404).json({ message: `No tag with id of ${req.params.id} found!` });
      return;
    }

    res.status(200).json(tagData)

  } catch (err) {
    res.status(500).json(err)
  }
});

// delete tag by ID route
router.delete('/:id', async (req, res) => {
    try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
// 404  error if tag with specified ID doesn't exist
    if (!tagData) {
      res.status(404).json({ message: `No tag with id of ${req.params.id} found!` });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
