import { Component, OnInit, ViewChild } from '@angular/core';
import { BannerService } from 'src/app/common/services/hybid/banner.service';

@Component({
  selector: 'app-banner-slider',
  templateUrl: './banner-slider.component.html',
  styleUrls: ['./banner-slider.component.scss'],
})
export class BannerSliderComponent implements OnInit {

  banners;

  bannerSlideOpts = {
    initialSlide: 0,
    preloadImages: true,
    lazy: false,
    slidesPerView: 1,
    autoplay: {
      // delay: 1000,
      disableOnInteraction: false
    },
    loop: true,
  }

  constructor(
    private bannerService: BannerService
  ) { }

  ngOnInit() {
    this.getBanners();
  }

  getBanners() {
    this.banners = this.bannerService.getAllLocal();
  }

}
