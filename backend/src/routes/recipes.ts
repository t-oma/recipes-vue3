import { Router } from 'express';
import * as recipeController from '../controllers/recipeController';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { createRecipeSchema } from '../schemas/recipe';

const router: Router = Router();

router.get('/', recipeController.getAllRecipes);
router.get('/:id', recipeController.getRecipeById);
router.post('/', authenticate, validate(createRecipeSchema), recipeController.createRecipe);

export default router;
