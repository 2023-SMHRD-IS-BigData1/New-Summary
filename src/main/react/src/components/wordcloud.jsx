import React, { useEffect } from 'react';
import * as d3 from 'd3';
import cloud from 'd3-cloud';

const width = 700;
const height = 600;

function WordcloudResult() {
    const data = [
        { word: 'Apple', value: 20 },
        { word: 'Banana', value: 10 },
        { word: 'blueberry', value: 15 },
        { word: 'pear', value: 8 },
        { word: 'test', value: 18 },
        { word: 'landy', value: 17 }
    ];

    // 레이아웃 초기 설정
    var layout = cloud()
        .size([width, height])
        .words(data.map(function (d) {
            // 최소 크기 10, 최대 크기 40으로 조정
            // const fontSize = Math.min(40, Math.max(10, 10 + d.value / 5));
            const fontSize = 10 + d.value / 5;
            return { text: d.word, size: fontSize, test: "haha" };
        }))
        .padding(20)
        .rotate(function () { return 0; })
        .font("Impact")
        .fontSize(function (d) { return d.size; });

    useEffect(() => {
        console.log("draw test1");
        // 데이터에 변화가 없다면 실행하지 않음
        layout.words(data.map(function (d) {
            // 최소 크기 10, 최대 크기 40으로 조정
            const fontSize = Math.min(40, Math.max(10, 10 + d.value * 3));
            return { text: d.word, size: fontSize, test: "haha" };
        }, []));

        layout.on("end", draw).start();
        // 레이아웃 실행

        function draw(words) {

            console.log("draw test2");
            // 기존 요소를 지우고 새로운 요소 추가
            d3.select("#word-cloud")
                .selectAll("svg")
                .data([words])
                .join("svg")
                .attr("width", width)
                .attr("height", height)
                .style("border", "1px solid #00000099")
                .style("margin", "0 50px")
                .append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
                .selectAll("text")
                .data(words)
                .enter().append("text")
                .style("fill", function () {
                    // 랜덤 RGB 값 생성
                    const randomColor = () => Math.floor(Math.random() * 256);
                    return `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
                })
                .style("font-size", function (d) { return d.size + "px"; })
                .style("font-family", "Impact")
                .attr("text-anchor", "middle")
                .attr("transform", function (d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function (d) { return d.text; });
        }
    }, []);

    return (
        <>
            <div id="word-cloud"></div>
        </>
    )
}

export default WordcloudResult;
