import { Component, OnInit } from '@angular/core';
import { BannerService } from 'src/app/common/services/hybid/banner.service';

@Component({
  selector: 'app-banner-slider',
  templateUrl: './banner-slider.component.html',
  styleUrls: ['./banner-slider.component.scss'],
})
export class BannerSliderComponent implements OnInit {

  banners;

  bannerSlideOpts= {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true,
    loop:true,
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
