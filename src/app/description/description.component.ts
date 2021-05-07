import { Description } from './../grehamis.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {

  @Input() description!: Description;
  @Input() etapeSuive!: boolean;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  }


}
