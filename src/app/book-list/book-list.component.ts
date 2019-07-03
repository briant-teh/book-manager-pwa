import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';

declare var $: any;

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

            console.log('books', this.books);
        });
    }

    addBook(book): void {
        console.log('adding book', book);
        if (book.title && book.title.length > 0) {
            this.firestoreService.addBook(book)
                .then(result => {
                    console.log('addBook result', result);
                })
                .catch(err => {
                    console.log('addBook err', err);
                });
        }
    }

    deleteBook(id): void {
        console.log('deleting book...', id);
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