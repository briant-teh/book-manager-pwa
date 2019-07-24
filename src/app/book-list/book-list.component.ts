import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';

declare var $: any;
declare var M: any;

@Component({
    selector: 'app-book-list',
    templateUrl: './book-list.component.html',
    styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
    book: any = {
        
    };
    books: [];

    constructor(
        private firestoreService: FirestoreService
    ) {
    }

    ngOnInit() {
        $('document').ready(() => {
            $('#add-form').sidenav();
            $('.carousel').carousel();

            var carousel = M.Carousel.getInstance(document.querySelector('.carousel'));

            setInterval(() => {
                carousel.next();
            }, 5000);
        });

        this.getBooks();
    }

    getBooks(): void {this.firestoreService.getBooksActions()
        .subscribe(result => {
            this.books = result.map(action => {
                return {
                    id: action.payload.doc.id,
                    data: action.payload.doc.data()
                }
            });
        });
    }

    addBook(book): void {
        let bookToAdd = JSON.parse(JSON.stringify(book));
        this.book = {
            title: '',
            author: '',
            genre: ''
        };

        if (bookToAdd.title && bookToAdd.title.length > 0) {
            this.firestoreService.addBook(bookToAdd)
                .then(result => {
                    console.log('addBook result', result);
                })
                .catch(err => {
                    console.log('addBook err', err);
                });
        }
    }

    deleteBook(id): void {
        if (id) {
            this.firestoreService.deleteBook(id)
                .then(result => {
                    console.log('deleteBook result:', result);
                })
                .catch(err => {
                    console.log('deleteBook err:', err);
                });
        }
    }
}