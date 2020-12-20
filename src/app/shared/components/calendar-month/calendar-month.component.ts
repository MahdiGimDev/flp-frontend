import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  Input,
  OnChanges,
  SimpleChanges,
  EventEmitter,
} from "@angular/core";
import { Subject } from "rxjs";
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from "angular-calendar";
import { OnInit } from "@angular/core";
import * as moment from "moment";
import { Output } from "@angular/core";
import { missionModel } from "../../../@core/models/mission.model";
import { endOfDay, startOfDay } from "date-fns";
import { Router } from "@angular/router";

const colors: any = {
  red: {
    primary: "#ad2121",
    secondary: "#FAE3E3",
  },
  blue: {
    primary: "#1e90ff",
    secondary: "#D1E8FF",
  },
  yellow: {
    primary: "#e3bc08",
    secondary: "#FDF1BA",
  },
};

@Component({
  selector: "app-calendar-month",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./calendar-month.component.html",
  styleUrls: ["./calendar-month.component.scss"],
})
export class CalendarMonthComponent implements OnInit, OnChanges {
  @ViewChild("modalContent", { static: true }) modalContent: TemplateRef<any>;
  @Input() posts: Array<any> = [];
  @Input() events: CalendarEvent[] = [];
  @Output() clicked: EventEmitter<any> = new EventEmitter();
  @Output() changeMonths = new EventEmitter<any>();

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  loading = false;
  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  refresh: Subject<any> = new Subject();

  activeDayIsOpen = true;
  currentDate = new Date();
  closeResult = "";
  constructor(private router: Router) {}

  ngOnInit(): void {}
  onStartLoading() {}
  ngOnChanges(changes: SimpleChanges): void {
    this.loading = true;
    this.events = [];
    console.log({ mss: this.posts });
    this.fillEvents();
    this.refresh.next();
  }
  open(event): any {}
  
  fillEvents() {
    const events: Array<CalendarEvent> = [];
    this.posts.map((mission) => {
      this.events = [
        ...this.events,
        {
          title: "New event",
          start: startOfDay(new Date(mission.startDate)),
          end: endOfDay(new Date(mission.endDate)),
          meta: {
            mission,
          },
          allDay: true,
          color: colors.red,
          draggable: true,
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
        },
      ];
    });
    console.log({ events });
  }
  onClickEvent(event) {
    const missionID = event?.id;
    this.router.navigate(["/pages/missions/detail", missionID]);
    this.clicked.emit(event); // Pass any payload as argument
  }

  setView(view: CalendarView): void {
    this.view = view;
  }
  onDateChange(event): void {
    this.loading = true;
    this.changeMonths.emit(this.viewDate);
  }

  closeOpenMonthViewDay(): void {
    this.activeDayIsOpen = false;
  }
}
