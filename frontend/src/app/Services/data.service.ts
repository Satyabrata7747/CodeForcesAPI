import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  contest: any = [];
  users: any = [];
  filtered: any = [];
  isLoading: boolean = true;
  constructor(private _http: HttpClient) {}
  user(name) {
    this._http
      .get('http://localhost:3000/user/' + name)
      .pipe(
        map((res) => {
          console.log(res['length']);
          for (let i = 0; i < res['length']; i++) {
          
            for (let j = 0; j < this.contest.length; j++) {
              if (this.contest[j].id == res[i].contestId) {
                if (this.contest[j].solved.indexOf('-') != -1) {
                  this.contest[j].solved = res[i].problem.index;
                } else {
                  this.contest[j].solved = this.contest[j].solved.concat(
                    ' ',
                    res[i].problem.index
                  );
                }
                console.log(
                  this.contest[j].id + '   ' + this.contest[j].solved
                );
              }
            }
            // this.filtered.push({
            //   contestId: res[i]['contestId'],
            //   index: res[i].problem.name,
            //   name: res[i].problem.index,
            //   verdict: res[i].verdict,
            // });
          }
          console.log(res[1].problem.index);
          return this.filtered;
        })
      )
      .subscribe((response) => {
        this.isLoading = false;
        console.log('Hello');
      });
  }
  home() {
    if (this.contest.length == 0) {
      this._http
        .get('http://localhost:3000/home')
        .pipe(
          map((res) => {
            for (let i = 0; i < res['length']; i++) {
              this.contest.push({
                id: res[i].id,
                name: res[i].name,
                solved: '-',
              });
            }
            return this.contest;
          })
        )
        .subscribe((response) => {
          this.contest = response;
          this.isLoading = false;
        });
    }
  }
}
function res(res: any): import('rxjs').OperatorFunction<Object, unknown> {
  throw new Error('Function not implemented.');
}
