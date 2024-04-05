const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if(!categoryData) {
      res.status(404).json({ message: `No category with id of ${req.params.id} found!` });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  // req.body should look like this...
  // {
  // category_name: "string here"
  // }
  try {
    const categoryData = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(categoryData);
    } catch (err) {
      res.status(400).json(err)
    }
  });

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  // req.body should look like this...
  // {
  // category_name: "new category name here"
  // }
  try {
    const categoryData = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    
    if (!categoryData) {
      res.status(404).json({ message: `No category with id of ${req.params.id} found!` });
      return;
    }

  } catch (err) {
    res.status(500).json(err)
  }
  });

router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: `No category with id of ${req.params.id} found!` });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
