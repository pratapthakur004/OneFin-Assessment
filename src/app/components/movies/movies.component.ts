import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged, filter, fromEvent, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  moviesData: any;
  data: any;
  notFound: boolean = false;
  isRefresh: boolean = false;
  pageNumber: any;
  isLoading: boolean = false;
  selectedMovie: any = { title: '', description: '' };
  url: string = 'https://demo.credy.in/api/v1/maya/movies/';
  @ViewChild('input') input!: ElementRef;
  searchText!: string;

  constructor(private authSer: AuthService, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.getMovies(this.url);
  }

  getMovies(url: string) {
    this.isLoading = true;
    this.authSer.get(url)
      .subscribe((res: any) => {
        const urlObject = new URL(url);
        this.pageNumber = urlObject.searchParams.get("page");
        this.data = res;
        this.moviesData = res.results;
        this.isRefresh = false
        this.isLoading = false
      },
        (error) => {
          this.isRefresh = true;
          if (error.error.is_success === false) {
            this.isLoading = false
            this.toastr.error(error.error.error.message, 'Request Failed');
          }
        }
      )
  }

  loadPage(url: string) {
    if (url) {
      this.url = url;
      this.getMovies(url);
    }
  }

  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(250),
        distinctUntilChanged(),
        tap(() => {
          const inputValue = this.input.nativeElement.value;
          if (inputValue.length > 3) {
            this.searchText = inputValue;
            this.moviesData = this.moviesData.filter((ele: any) => {
              return JSON.stringify(ele).toLowerCase().includes(this.searchText);
            })
            if (this.moviesData.length === 0) {
              this.notFound = true;
            }
          } else {
            this.notFound = false;
            this.moviesData = this.data.results;
          }
        })
      )
      .subscribe();
  }

  modalOpen(movie: any) {
    this.selectedMovie = movie;
    const modalElement = document.getElementById('myModal');
    if (modalElement) {
      modalElement.classList.add('show');
      modalElement.style.display = 'block';
    }
  }

  modalClose() {
    this.selectedMovie = { title: '', description: '' };
    const modalElement = document.getElementById('myModal');
    if (modalElement) {
      modalElement.classList.remove('show');
      modalElement.style.display = 'none';
    }
  }
}



