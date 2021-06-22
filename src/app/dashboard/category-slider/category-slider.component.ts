import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { ServicecategoriesService } from 'src/app/common/services/http/servicecategory.service';

@Component({
  selector: 'app-category-slider',
  templateUrl: './category-slider.component.html',
  styleUrls: ['./category-slider.component.scss'],
})
export class CategorySliderComponent implements OnInit {

  @ViewChild('slides') slides: IonSlides;
  @Output() categoryChangedEventEmitter = new EventEmitter();

  imageUrl = "";

  sliderOptions = {
    slidesPerView: 3,
    // spaceBetween: 5,
    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 4,
        // spaceBetween: 5
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 6,
        // spaceBetween: 30
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 8,
        // spaceBetween: 40
      }
    },
    zoom: false, grabCursor: true
  };

  serviceCategories;
  selectedCategory;

  constructor(
    private serviceCategoryServices: ServicecategoriesService
  ) { }

  ngOnInit() {
    this.serviceCategories = this.serviceCategoryServices.getAllLocalServiceCategories();
  }


  next() {
    this.slides.slideNext();
  }

  prev() {
    this.slides.slidePrev();
  }

  changeCategory(data) {
    this.selectedCategory = data;
    this.categoryChangedEventEmitter.emit(this.selectedCategory);
  }

}
