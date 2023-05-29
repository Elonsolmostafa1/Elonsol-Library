import {Router} from 'express'
import userAuth from '../../middleware/auth.js';
import { calcLateAndFine } from '../../middleware/calcLateAndFine.js';
import validation from '../../middleware/validation.js';
import { fileUpload } from '../../utils/fileUpload.js';
import * as bookController from './book.controller.js';
import * as bookValidation from './book.validation.js';



const router = Router();



router.post('/',userAuth,fileUpload('path'),validation(bookValidation.bookSchema),bookController.addBook)
router.get('/',userAuth,bookController.getAllBooks)
router.get('/books/:id',userAuth,bookController.getBookById)
router.post('/issue',userAuth,validation(bookValidation.issueBookSchema),bookController.issueBook)
router.post('/return',userAuth,validation(bookValidation.returnBookSchema),bookController.returnBook)
router.get('/issue',userAuth,bookController.getIssuedBooks)
router.get('/searchBooks/:letters',userAuth,bookController.getAllBooksByName)

router.get('/search/:bookName',userAuth,validation(bookValidation.searchBookSchema),bookController.searchIssuedBooks)
router.get('/nonreturn',userAuth,calcLateAndFine,bookController.getNonReturnedBooks)



export default router;