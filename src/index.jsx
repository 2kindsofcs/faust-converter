import React from "react";
import { render } from "react-dom";
import update from "immutability-helper";

const soju_ABV = 17;
const faust_al = ((30 * 0.4) + (30 * 0.755) + (15 * 0.2));

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            soju_G: 0,
            soju_B: 0,
        };
    }

    alcoholCal() {
        if (this.state.soju_G >=0 && this.state.soju_B >= 0){
            const soju_G_volume = this.state.soju_G * 50;
            const soju_B_volume = this.state.soju_B * 360;
            const result_faust = ((soju_G_volume + soju_B_volume) * soju_ABV * 0.01) / faust_al
            this.setState(update(this.state, {
                result_faust: {
                    $set: result_faust,
                },
            }));
        }
    }

    reset() {
        this.setState(update(this.state, {
            result_faust: { $set: null },
            soju_B: { $set: 0 },
            soju_G: { $set: 0 },
        }));
    }

    renderResult() {
        if (this.state.result_faust != undefined) {
            return <div className="resultParas">
                <p className="conversion_result">{
                    `계산 결과: 약 ${this.state.result_faust.toFixed(1)}파우스트입니다.`
                }</p>
                { this.state.result_faust >= 4 ? <p className="message" style={{ color: "red" }}>당신의 간, 괜찮으십니까?</p> : "" }
            </div>;
        } else {
            return ""
        }
    }

    render() {
        const result_exists = this.state.result_faust != undefined;
        return <React.Fragment>
            <h1 style={{ textAlign: "center" }}>The Faust Converter</h1>
            <p>
                <b>당신이 먹은 소주의 알코올 양을 밀리리터(ml)로 계산하여 몇 파우스트인지 알려드립니다.
                    소주 도수는 17도라고 가정하고 계산합니다.</b>
            </p>
            <div>
                <label htmlFor="input_sojuB">소주</label>
                <input type="number" value={this.state.soju_B.toString(10)} disabled={result_exists} onChange={(e) => this.setState(update(this.state, {
                    soju_B: { $set: Number(e.currentTarget.value) }
                }))}/> 병(360ml/병)
                <br/>
                <label htmlFor="input_sojuG">소주</label>
                <input type="number" value={this.state.soju_G.toString(10)} disabled={result_exists} onChange={(e) => this.setState(update(this.state, {
                    soju_G: { $set: Number(e.currentTarget.value) }
                }))}/> 잔(50ml/잔)
                <input type="submit" value="계산하기" onClick={this.alcoholCal.bind(this)} disabled={result_exists} />
            </div>
            { this.renderResult() }
            { result_exists ? <button onClick={this.reset.bind(this)}>다시 계산하기</button> : "" }
        </React.Fragment>;
    }
}

render(<App />, document.querySelector("#App"))