<template>
  <div class="hello">
    <!-- header -->
    <header>
      <h1>科学防护 共渡难关</h1>
      <h2>肺炎疫情实时动态播报</h2>
      <div class="logo" >
        <!-- <span></span> -->
        <!-- 中国矿业大学公共安全与消防研究所 -->
        鸿鹄安全科技
      </div>
    </header>
    <nav>
      <div class="detailed">
        <div class="detailed_title"> 徐州疫情数据 </div>
        <div class="detailed_time">截至{{ creattime }}<span> | 数据来自徐州卫健委官网</span></div>
        <div class="detailed_data">
          <div class="detailed_confirm">
            <h4>确诊</h4>
            <div class="number" style="color: #e10000">{{ xuzhouInfo.confirm }}</div>
            <p class="added" style="display: block;">较昨日+<span style="color: #e10000">{{ xuzhouInfo.confirmAdd }}</span></p>
          </div>
          <div class="detailed_suspect">
            <h4>疑似</h4>
            <div class="number" style="color: #ffa352">{{ xuzhouInfo.suspect }}</div>
            <p class="added" style="display: block;">较昨日<span style="color: #ffa352">+{{ xuzhouInfo.suspectAdd }}</span></p>
          </div>
          <div class="detailed_dead">
            <h4>死亡</h4>
            <div class="number">{{ xuzhouInfo.dead }}</div>
            <p class="added" style="display: block;">较昨日<span>+{{ xuzhouInfo.deadAdd }}</span></p>
          </div>
          <div class="detailed_heal">
            <h4>治愈</h4>
            <div class="number" style="color: #34aa70">{{ xuzhouInfo.heal }}</div>
            <p class="added" style="display: block;">较昨日<span style="color: #34aa70">+{{ xuzhouInfo.healAdd }}</span></p>
          </div>
        </div>
        <div class="detailed_introduce" v-for="(item, ind) of introduceArr" :key="'introduce'+ind">
          <i class="rhombus" :class=" ind > 1 ? 'orange' : 'red'"></i>
          <div class="descText___Ui3tV">{{ item.type }}:{{ item.details }}</div>
        </div>
        <span v-if="developSwitch" class="detailed_develop" @click="intoDevelop">
          <img src="data:image/png;base64,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" alt="展开">
        </span>
      </div>
      <div><div id="container"></div></div>
      <div id="myChart"></div>
      <div id="myChart_two"></div>

      <div class="table">
        <div class="table_tit" ref="table_tit" >徐州病例</div>
        <div class="table_title" ref="table_title" :class='positionType'>
          <p class="subBlock1 title">地区</p>
          <p class="subBlock2 title" style="color: red">疑似</p>
          <p class="subBlock2 title">确诊</p>
          <p class="subBlock4 title">死亡</p>
          <p class="subBlock3 title">治愈</p>
        </div>
        <div class="table_title" v-for="(item, ind) in this.areaInfo" :key="'able_title' + ind" 
          :style="{ backgroundColor: ind % 2 == 1 ? '' : '#f6f6f6' }">
          <p class="classify_title" >{{ item.area }}</p>
          <p class="title" style="color: red">{{ item.suspect ? item.suspect: '-' }}</p>
          <p class="title">{{ item.confirm ? item.confirm: '-' }}</p>
          <p class="title">{{ item.dead ? item.dead: '-'  }}</p>
          <p class="title">{{ item.heal ? item.heal: '-'  }}</p>
        </div>

      </div>
      
    </nav>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      introduceArr:[
        '病毒：SARS-CoV-2，其导致疾病命名 COVID-19',
        '传染源：新冠肺炎的患者。无症状感染者也可能成为传染源。'
      ],
      developSwitch:true,
      positionType: '',
      personList:[
      ],
      xuzhouInfo: {
        confirm: 60,
        heal: 8,
        dead: 0,
        suspect: 0,
        eadRate: 0,
        confirmAdd: 8,
        healAdd: 8,
        deadAdd: 8,
        suspectAdd: 8,
      },
      areaInfo: [
        { 
          area: "云龙区",
          createDate: null,
          confirm: 5,
          dead: null,
          heal: null,
          suspect: null,
          updateTime: "2020-02-11 14:11:50.0",
        }
      ],
      creattime: "2020-02-12 13:10:00.0",
      epidemicSituation: [{
        id: 1,
        type: "病毒",
        details: "SARS-CoV-2，其导致疾病命名 COVID-19"
      },{
        id: 2,
        type: "传染源",
        details: "新冠肺炎的患者。无症状感染者也可能成为传染源。"
      }],
      epidemicSituationSource:[]
    }
  },
  mounted() {
    // 初始化高德地图
    this.initmap();
    // 初始化echart
    this.drawLine();

    window.addEventListener('scroll',this.handleScroll,true)
    // window.addEventListener('touchmove',this.handleScroll,true)

    // 获取各个县区确诊人数
    this.getVirusInfo();
    //徐州疫情
    this.getInfo();
    
  },
  methods: {
    // 高德地图
    initmap() {
      let map = new AMap.Map("container", {
      zoom: 12.6
      });
      function markerClick(e) {
        infoWindow.setContent(e.target.content);
        infoWindow.open(map, e.target.getPosition());
      };
      var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(13.5, -32)});
      this.$axios.post("xzPatient/queryList").then(data => {
        this.personList = data.data.data.list;
        // 实例化点标记
        this.personList.forEach((item,index)=>{
          let list = [];
          list.push(item.longitude);
          list.push(item.latitude);
          let marker = new AMap.Marker({
            icon: "../../static/image/type3.png",
            position: list,
            // offset: new AMap.Pixel(-13, -30)
            map:map
          });
          // marker.setMap(map);
          marker.content = "<div>"+"<span style='color: #f75c2f;'>"+item.patientName+"</span>"+"&emsp;"+item.sex+"&emsp;"+item.age+"岁"+"<br>"+"地址: "+"<span style='color: #f75c2f;'>"+item.addr+"</span>"+"<br>"+item.details+"</div>";
          marker.on('click', markerClick);
          marker.on('hover', markerClick);
          // marker.emit('click', {target: marker});
        });
      }).catch(response => {
        console.log("getDataErr:" + response);
      });
      var colors = [
        "#3366cc",
        "#dc3912",
        "#ff9900",
        "#109618",
        "#990099",
        "#0099c6",
        "#dd4477",
        "#66aa00",
        "#b82e2e",
        "#316395",
        "#994499",
        "#22aa99",
        "#aaaa11",
        "#6633cc",
        "#e67300",
        "#8b0707",
        "#651067",
        "#329262",
        "#5574a6",
        "#3b3eac"
      ];
      AMapUI.load(["ui/geo/DistrictExplorer", "lib/$", "ui/misc/PointSimplifier"],
        function(DistrictExplorer, $, PointSimplifier) {
          //创建一个实例
          var districtExplorer = (window.districtExplorer = new DistrictExplorer({
            map: map,
            eventSupport: true, //打开事件支持
            preload: [320300] //预加载徐州
          }));
          //要聚合的点列表
          var lngLatList;
          //当前聚焦的区域
          var currentAreaNode = null;
          //鼠标hover提示内容
          var $tipMarkerContent = $('<div id="showText" class="tipMarker top" style="background-color: rgba(34,34,34,0.5); width:2rem; text-align: center; color:#fff;border-radius: 4px;"></div>');
          var tipMarker = new AMap.Marker({
            content: $tipMarkerContent.get(0),
            offset: new AMap.Pixel(0, 0),
            bubble: true
          });
          //根据Hover状态设置相关样式
          function toggleHoverFeature(feature, isHover, position) {
            tipMarker.setMap(isHover ? map : null);
            if (!feature) {
              return;
            }
            var props = feature.properties;
            if (isHover) {
              var points = groupedPointsCache[props.adcode] || [];
              window.areaInfo.forEach((item,index)=>{
                if (item.area == props.name) {
                  //更新提示内容
                  $tipMarkerContent.html(
                    "确诊病例 " + ":"+"<br>" + props.name + "( " +"<span style='color: red;'>"+item.confirm +"</span>"+ " )"
                  );
                }
              });
              //更新位置
              tipMarker.setPosition(position || props.center);
            }

            $("#area-tree").find('h2[data-adcode="' + props.adcode + '"]').toggleClass("hover", isHover);

            //更新相关多边形的样式
            var polys = districtExplorer.findFeaturePolygonsByAdcode(
              props.adcode
            );
            for (var i = 0, len = polys.length; i < len; i++) {
              polys[i].setOptions({
                fillOpacity: isHover ? 0.5 : 0.2
              });
            }
          }

          //监听feature的hover事件
          districtExplorer.on("featureMouseout featureMouseover", function(
            e,
            feature
          ) {
            toggleHoverFeature(
              feature,
              e.type === "featureMouseover",
              e.originalEvent ? e.originalEvent.lnglat : null
            );
          });

          //监听鼠标在feature上滑动
          districtExplorer.on("featureMousemove", function(e, feature) {
            //更新提示位置
            tipMarker.setPosition(e.originalEvent.lnglat);
          });

          //feature被点击
          districtExplorer.on("featureClick", function(e, feature) {
            var props = feature.properties;
            toggleHoverFeature(
              feature,
              e.type === "featureClick",
              e.originalEvent ? e.originalEvent.lnglat : null
            );
            //如果存在子节点
            if (props.childrenNum > 0) {
              //切换聚焦区域
              switch2AreaNode(props.adcode);
            }
          });

          //绘制区域面板的节点
          function renderAreaPanelNode(ele, props, color) {
            var $box = $("<li/>").addClass("lv_" + props.level);
            var points = groupedPointsCache[props.adcode] || [];
            var $h2 = $("<h2/>")
              .addClass("lv_" + props.level)
              .attr({
                "data-adcode": props.adcode,
                "data-level": props.level,
                "data-children-num": props.childrenNum || void 0,
                "data-center": props.center.join(",")
              })
              .html(props.name + "(" + points.length + ")")
              .appendTo($box);

            if (color) {
              $h2.css("borderColor", color);
            }

            //如果存在子节点
            if (props.childrenNum > 0) {
              //显示隐藏
              $('<div class="showHideBtn"></div>').appendTo($box);
              //子区域列表
              $("<ul/>").addClass("sublist lv_" + props.level).appendTo($box);
              $('<div class="clear"></div>').appendTo($box);
              if (props.level !== "country") {
                $box.addClass("hide-sub");
              }
            }
            $box.appendTo(ele);
          }

          //填充某个节点的子区域列表
          function renderAreaPanel(areaNode) {
            var props = areaNode.getProps();
            var $subBox = $("#area-tree").find('h2[data-adcode="' + props.adcode + '"]').siblings("ul.sublist");
            if (!$subBox.length) {
              //父节点不存在，先创建
              renderAreaPanelNode($("#area-tree"), props);
              $subBox = $("#area-tree").find("ul.sublist");
            }
            if ($subBox.attr("data-loaded") === "rendered") {
              return;
            }
            $subBox.attr("data-loaded", "rendered");
            var subFeatures = areaNode.getSubFeatures();
            subFeatures.sort(function(f1, f2) {
              var props1 = areaNode.getPropsOfFeature(f1),
                props2 = areaNode.getPropsOfFeature(f2);
              var points1 = groupedPointsCache[props1.adcode] || [],
                points2 = groupedPointsCache[props2.adcode] || [];
              return points2.length - points1.length;
            });

            //填充子区域
            for (var i = 0, len = subFeatures.length; i < len; i++) {
              renderAreaPanelNode(
                $subBox,
                areaNode.getPropsOfFeature(subFeatures[i]),
                colors[i % colors.length]
              );
            }

            return $subBox;
          }

          //绘制某个区域的边界
          function renderAreaPolygons(areaNode) {
            //更新地图视野
            map.setBounds(areaNode.getBounds(), null, null, true);
            //清除已有的绘制内容
            districtExplorer.clearFeaturePolygons();
            //绘制子区域
            districtExplorer.renderSubFeatures(areaNode, function(feature, i) {
              var fillColor = colors[i % colors.length];
              var strokeColor = colors[colors.length - 1 - (i % colors.length)];
              return {
                cursor: "default",
                bubble: true,
                strokeColor: strokeColor, //线颜色
                strokeOpacity: 1, //线透明度
                strokeWeight: 1, //线宽
                fillColor: fillColor, //填充色
                fillOpacity: 0.35 //填充透明度
              };
            });
            //绘制父区域
            districtExplorer.renderParentFeature(areaNode, {
              cursor: "default",
              bubble: true,
              strokeColor: "black", //线颜色
              strokeOpacity: 1, //线透明度
              strokeWeight: 1, //线宽
              fillColor: null, //填充色
              fillOpacity: 0.35 //填充透明度
            });
          }

          //切换区域后刷新显示内容
          function refreshAreaNode(areaNode) {
            districtExplorer.setHoverFeature(null);
            renderAreaPolygons(areaNode);
            //更新选中节点的class
            var $nodeEles = $("#area-tree").find("h2");
            $nodeEles.removeClass("selected");
            var $selectedNode = $nodeEles.filter("h2[data-adcode=" + areaNode.getAdcode() + "]").addClass("selected");
            //展开下层节点
            $selectedNode.closest("li").removeClass("hide-sub");
            //折叠下层的子节点
            $selectedNode.siblings("ul.sublist").children().addClass("hide-sub");
          }

          //切换区域
          function switch2AreaNode(adcode, callback) {
            if (currentAreaNode && "" + currentAreaNode.getAdcode() === "" + adcode) {
              return;
            }
            loadAreaNode(adcode, function(error, areaNode) {
              if (error) {
                if (callback) {
                  callback(error);
                }
                return;
              }
              currentAreaNode = window.currentAreaNode = areaNode;
              //设置当前使用的定位用节点
              districtExplorer.setAreaNodesForLocating([currentAreaNode]);
              refreshAreaNode(areaNode);
              if (callback) {
                callback(null, areaNode);
              }
            });
          }
          var groupedPointsCache = {};
          function getGroupedPoints(adcode) {
            return groupedPointsCache[adcode] || lngLatList;
          }
          //保留中间聚合结果
          function saveGroupedPoints(areaNode, groups) {
            for (var i = 0, len = groups.length; i < len; i++) {
              var subFeature = groups[i].subFeature; //所属子区域
              if (!subFeature) {
                groupedPointsCache["-out-" + areaNode.getAdcode()] = groups[i].points;
                continue;
              }
              groupedPointsCache[subFeature.properties.adcode] = groups[i].points;
            }
          }

          //这里创建一个海量点组件
          var pointSimplifierIns;
          pointSimplifierIns = new PointSimplifier({
            zIndex: 115,
            autoSetFitView: false,
            map: map, //所属的地图实例

            getPosition: function(item) {
              return item.pos;
            },
            getHoverTitle: function(item, idx) {
              if (item.gid === -1) {
                return "区域外";
              }
            },
            //使用GroupStyleRender
            renderConstructor: PointSimplifier.Render.Canvas.GroupStyleRender,
            renderOptions: {
              //点的样式
              pointStyle: {
                fillStyle: "red",
                width: 5,
                height: 5
              },
              getGroupId: function(item) {
                return item.gid;
              },
              groupStyleOptions: function(gid) {
                //未知区域
                if (gid === -1) {
                  return {
                    pointStyle: {
                      content: questionContent,
                      fillStyle: null,
                      strokeStyle: null,
                      lineWidth: 2,
                      width: 16,
                      height: 16
                    }
                  };
                }

                return {
                  pointStyle: {
                    fillStyle: colors[gid % colors.length],
                    //strokeStyle: 'rgba(255,255,255,0.3)',
                    lineWidth: 1
                  }
                };
              }
            }
          });

          function renderGroupedPoints(groups) {
            var pointsData = [];
            for (var i = 0, len = groups.length; i < len; i++) {
              var gid = groups[i].subFeatureIndex;

              for (var j = 0, jlen = groups[i].points.length; j < jlen; j++) {
                pointsData.push({
                  gid: gid,
                  pos: groups[i].points[j]
                });
              }
            }
            pointSimplifierIns.setData(pointsData);
          }

          //加载区域
          function loadAreaNode(adcode, callback) {
            districtExplorer.loadAreaNode(adcode, function(error, areaNode) {
              if (error) {
                if (callback) {
                  callback(error);
                }
                return;
              }
              var points = getGroupedPoints(adcode);
              //当前子区域聚合
              var groups = areaNode.groupByPosition(points, function(item) {
                return item;
              });
              saveGroupedPoints(areaNode, groups);
              var $subBox = renderAreaPanel(areaNode);
              if (groups.length && !groups[groups.length - 1].subFeature) {
                renderAreaPanelNode(
                  $subBox,
                  {
                    adcode: "-out-" + areaNode.getAdcode(),
                    name: "区域外",
                    center: groups[groups.length - 1].points[0]
                  },
                  "gray"
                );
              }
              renderGroupedPoints(groups);
              if (callback) {
                callback(null, areaNode);
              }
            });
          }

          // $('<div id="loadingTip">加载数据，请稍候...</div>').appendTo(document.body);
          $.get("https://a.amap.com/amap-ui/static/data/10w.txt", function(csv) {
            $("#loadingTip").remove();
            var lines = csv.split("\n");
            var lngLats = [];
            for (var i = 0, len = lines.length; i < len; i++) {
              if (!lines[i]) {
                continue;
              }
              var parts = lines[i].split(",");
              lngLats.push([parseFloat(parts[0]), parseFloat(parts[1])]);
            }
            // lngLatList = lngLats;
            lngLatList = [];
            groupedPointsCache["100000"] = lngLats;
            //加载全国
            switch2AreaNode(320300);
          });
        }
      );
    },
    //徐州各个区县新型冠状病毒确诊信息
    getVirusInfo() {
      this.$axios.get("xzRegionEpidemicSituation/queryList").then(data => {
        window.areaInfo = data.data.data.list;
        this.areaInfo = data.data.data.list;
        
      }).catch(response => {
        console.log("getDataErr:" + response);
      });
    },
    //徐州疫情
    getInfo() {
      this.$axios.get("xzEpidemicSituation/getXzYq").then(data => {
        this.xuzhouInfo = data.data.data.total;
        this.creattime = data.data.data.total.updateTime;
      }).catch(response => {
        console.log("getDataErr:" + response);
      });

      this.$axios.get("epidemicSituation/queryList").then(data => {
        this.epidemicSituationSource = data.data.data.list;
        this.introduceArr = [
          data.data.data.list[0],
          data.data.data.list[1],
        ]
      }).catch(response => {
        console.log("getDataErr:" + response);
      });
    },
    // 添加部分简介
    intoDevelop() {
      this.introduceArr = [ ...this.epidemicSituationSource ];
      this.developSwitch = false;
    },
    // echart
    drawLine(){
      let fontsize = 100 * (document.documentElement.clientWidth / 750);
      let mychartCon = document.getElementById('myChart');
      mychartCon.style.width = `${ fontsize * 6.86 }px`, 
      mychartCon.style.height = `${ fontsize * 5.45 }px`,
      mychartCon.style.borderRadius = `${ fontsize * 0.16 }px`;
      mychartCon.style.marginTop = `${ fontsize * 0.34 }px`;
      mychartCon.style.padding = `${ fontsize * 0.15 }px`;

      let mychartCon_two = document.getElementById('myChart_two');
      mychartCon_two.style.width = `${ fontsize * 6.86 }px`, 
      mychartCon_two.style.height = `${ fontsize * 5.45 }px`,
      mychartCon_two.style.borderRadius = `${ fontsize * 0.16 }px`;
      mychartCon_two.style.marginTop = `${ fontsize * 0.34 }px`;
      mychartCon_two.style.padding = `${ fontsize * 0.15 }px`;

      let chartData = this.$axios.get("xzEpidemicSituation/queryList")
      chartData.then(data => {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(mychartCon);
        let myChart_two = this.$echarts.init(mychartCon_two);
        let app = {};
        let option = null;
        let option_two = null;

        option = {
          title: {
            text: '徐州疫情累计趋势图',
            x:'center',
            y:'top',
            textStyle:{
              fontStyle:'normal',     //风格
              fontWeight:'normal',    //粗细
              fontFamily:'Microsoft yahei',   //字体
              fontSize: 0.28*fontsize,     //大小
              align:'center'   //水平对齐
            },
          },
          tooltip: {
              trigger: 'axis'
          },
          color: ['#f7850e', '#3ebeac', '#6699fe', '#000'],
          legend: {
            data: ['确诊', '治愈', '疑似', '死亡' ],
            orient: 'vertical',
            left: 'center',
            bottom:'bottom',
            itemWidth: .50*fontsize,
            itemGap: .25*fontsize
          },
          grid: {
            top: .8*fontsize,//距上边距
            left: .8*fontsize,//距离左边距
            right: .8*fontsize,//距离右边距
            bottom: .8*fontsize,//距离下边距
          },
          xAxis: {
              type: 'category',
              boundaryGap: false,
              data: []
          },
          yAxis: {
              type: 'value'
          },
          series: [
            {
              name: '确诊',
              type: 'line',
              smooth:true,
              data: []
            },
            {
              name: '治愈',
              type: 'line',
              smooth:true,
              data: [],
            },
            {
              name: '疑似',
              type: 'line',
              smooth:true,
              data: []
            },
            {
              name: '死亡',
              type: 'line',
              smooth:true,
              data: []
            }
          ]
        };
        option_two = {
          title: {
            text: '徐州疫情新增趋势图',
            x:'center',
            y:'top',
            textStyle:{
              fontStyle:'normal',     //风格
              fontWeight:'normal',    //粗细
              fontFamily:'Microsoft yahei',   //字体
              fontSize: 0.28*fontsize,     //大小
              align:'center'   //水平对齐
            },
          },
          tooltip: {
              trigger: 'axis'
          },
          legend: {
            data: ['确诊', '治愈', '疑似', '死亡' ],
            orient: 'vertical',
            left: 'center',
            bottom:'bottom',
            itemWidth: .50*fontsize,
            itemGap: .25*fontsize
          },
          color: ['#f7850e', '#3ebeac', '#6699fe', '#000'],
          grid: {
            top: .8*fontsize,//距上边距
            left: .8*fontsize,//距离左边距
            right: .8*fontsize,//距离右边距
            bottom: .8*fontsize,//距离下边距
          },
          xAxis: {
              type: 'category',
              boundaryGap: false,
              data: []
          },
          yAxis: {
              type: 'value'
          },
          series: [
            {
              name: '确诊',
              type: 'line',
              smooth:true,
              data: []
            },
            {
              name: '治愈',
              type: 'line',
              smooth:true,
              data: [],
            },
            {
              name: '疑似',
              type: 'line',
              smooth:true,
              data: []
            },
            {
              name: '死亡',
              type: 'line',
              smooth:true,
              data: []
            }
          ]
        };
        data.data.data.list.forEach( item => {
          option.xAxis.data.push(item.createDate);
          option.series[0].data.push(item.confirm);
          option.series[1].data.push(item.heal);
          option.series[2].data.push(item.suspect);
          option.series[3].data.push(item.dead);

          option_two.xAxis.data.push(item.createDate);
          option_two.series[0].data.push(item.confirmAdd);
          option_two.series[1].data.push(item.healAdd);
          option_two.series[2].data.push(item.suspectAdd);
          option_two.series[3].data.push(item.deadAdd);
        })
        
        if (option && typeof option === "object") {
          myChart.setOption(option, true);
          myChart_two.setOption(option_two, true);
        }

      })
      
      chartData.catch(response => {
        console.log("getDataErr:" + response);
      });
    },
    
    // 监听滚动事件
    handleScroll() {
      if(this.$refs.table_tit.offsetTop) {
        let numberOne = this.$refs.table_tit.offsetTop  -  document.documentElement.scrollTop;
        if( numberOne <= 0 ) this.positionType = 'dom_flex';
        else if ( numberOne > 0 ) this.positionType = '';
      }
    }
  },
  destroyed() {
    window.removeEventListener('scroll',this.handleScroll,true)
  }
    
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
 .hello{
   height: 100%;
   width: 100%;

   header {
    height: 4.4rem;
    background-image: url('../../static/img/banner.png');
    background-size: contain;
    h1 { 
      color: #fff;
      position: absolute;
      left: .36rem;
      top: 1.04rem; 
      font: 700 .60rem/.60rem -apple-system-font,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,Helvetica Neue,PingFang SC,Hiragino Sans GB,Microsoft YaHei UI,Microsoft YaHei,Arial;
    } 
    h2 {
      color: #fff;
      position: absolute;
      left: .36rem;
      font: .38rem/.66rem -apple-system-font,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,Helvetica Neue,PingFang SC,Hiragino Sans GB,Microsoft YaHei UI,Microsoft YaHei,Arial;
      top: 1.64rem;
    }
    .logo {
      position: absolute;
      left: .36rem;
      top: .15rem;
      height: 0.5rem;
      display: flex;
      /* 矿大样式 */
      // background: url('../../static/img/CUMT.png') no-repeat center left;
      // background-size: .58rem .58rem;  
      // line-height: .58rem;
      /* 矿大样式 */

      /* 鸿鹄样式 */
      background: url('../../static/img/logo.png') no-repeat center left;
      background-size: .5rem .4rem;  
      line-height: 0.5rem;
      /* 鸿鹄样式 */ 
      
      padding-left: .62rem;
      color: #fff;
      display: inline-block;
      font-size: 0.25rem;
    }
   }

   nav {
    .detailed {
      width: 6.88rem;
      // height: 5.89rem;
      margin: -1.80rem auto .30rem;
      background-color: #fff;
      border-radius: .16rem;
      -webkit-box-shadow: 0 .02rem .20rem rgba(0,0,0,.1);
      box-shadow: 0 .02rem .20rem rgba(0,0,0,.1);
      padding: 0 .32rem .24rem;
      position: relative;
      z-index: 5;
    }

    .detailed_title {
      border-top-left-radius: .16rem;
      border-top-right-radius: .16rem;
      width: 100%;
      height: .74rem;
      font: .30rem/.74rem -apple-system-font,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,Helvetica Neue,PingFang SC,Hiragino Sans GB,Microsoft YaHei UI,Microsoft YaHei,Arial;
      color: #333;
      text-align: center;
      // background: #f1f1f1;
      border-bottom: .01rem solid #f1f1f1;
    }

    .detailed_time {
      margin-top: .20rem;
      font-size: .24rem;
      color: #999;
      font-weight: 400;
      text-align: left;

      span {
        padding-right: .30rem;
        width: auto;
        height: .22rem;
        // background: url('../../static/img/questionMark.png') no-repeat 100%;
        background-size: .21rem .21rem;
      }
    }

    .detailed_data {
      position: relative;
      width: 6.88rem;
      margin: 0.32rem 0 0.32rem -0.24rem;
      padding: 0 0.20rem;
      padding-bottom: 0.30rem;
      display: -webkit-flex; /* Safari */
      display: flex;
      flex-direction: row; 

      >div {
        flex: 1;
      }

      .number {
        font: 700 0.40rem/0.60rem -apple-system-font,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,Helvetica Neue,PingFang SC,Hiragino Sans GB,Microsoft YaHei UI,Microsoft YaHei,Arial;
        text-align: center;
      }

      .added {
        font: 0.22rem/1 -apple-system-font,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,Helvetica Neue,PingFang SC,Hiragino Sans GB,Microsoft YaHei UI,Microsoft YaHei,Arial;
        color: #999;
        text-align: center;
      }

      h4{
        text-align: center;
        font: 0.28rem/1 -apple-system-font,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,Helvetica Neue,PingFang SC,Hiragino Sans GB,Microsoft YaHei UI,Microsoft YaHei,Arial;
        color: #333;
      }
    }

    .detailed_data:before {
      content: "";
      position: absolute;
      left: 0.24rem;
      bottom: 0;
      height: 1px;
      width: 6.24rem;
      border-bottom: 1px solid #dcdcdc;
    }

    .detailed_introduce {
      // margin-bottom: .04rem;
      font-size: .15rem;
      line-height: .23rem;

      .rhombus {
        display: inline-block;
        width: .1rem;
        height: .1rem;
        margin-right: .13rem;
      }

      .red {
        background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAgCAYAAAAFQMh/AAAAAXNSR0IArs4c6QAAAPRJREFUSA3V100OwiAQBWAgcePOC3kCeo1eQ+/UlStP02Xjzi0WI421/My8AY1sWL35hgkJQal/W67vd5KeDRKerD3fxvHium6P5H1Gc4MeVc6dXuHrwRirh+HOrcOC39EAzQUgnAzHUAlOgnMoihdhCorgWZiDcvEkjKAcPApLUCq+gWugFHwF10RL+AK3QHP4E26JpnD9DTSGQ69TKCTZfzfq0HXLkc+n27xgy632DbTAY6i3VnBtPIVG4Vp4Dk3CUryEZmEUp6BFmItTURJMxTkoGS7hXJQFp3AEZcOfOIpCcMC1c0f0F+FrwEv6aYNhafABVAzZ2Wb8+PkAAAAASUVORK5CYII=') no-repeat;
        background-size: cover;
      }

      .orange {
        background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAgCAYAAAAFQMh/AAAAAXNSR0IArs4c6QAAAPlJREFUSA3V180JAjEQBeCMIIpHL4JteLcC+7AMBavYUjxZhS0INqB4ikTJ4u7mZ+ZNophLTm++YQgMMebfjm1WY03PIyR8P0z3j+v5aJvlDMm7DEmDDjXW7t5hOk0W8w1tLzdpHRH8iXqIDIaz4RCqwVlwCkXxLMxBETwJS1ApHoURVIIHYQ3KxQdwCZSDd+CSaA5v4RpoCn/BNdEYTt9AQzi0nXwhzf27Ufuua448tMHaV+0aqIGHUGd14NJ4DA3CpfAUGoW1eA5NwijOQbOwFOeiLJiLS1A2nMOlqAiO4Qgqhvs4ikKwx8maNfqLcDXgo/20wbA2+AQz9djtA5sDHAAAAABJRU5ErkJggg==') no-repeat;
        background-size: cover;
      }

      .descText___Ui3tV {
        margin-bottom: .1rem;
        display: inline-block;
        width: calc(100% - .30rem);
        vertical-align: top;
        font-size: .28rem;
        line-height: .35rem;
        text-align: left;
      }

    }

    .detailed_develop {
      width: .20rem;
      height: .20rem;
      object-fit: contain;
      img {
        width: .20rem;
        height: .20rem;
      }
    }

    #myChart {
      border: 1px solid #dcdcdc;
      margin: 0 auto;
    }
    #myChart_two {
      border: 1px solid #dcdcdc;
      margin: 0 auto;
    }

    #container {
      width: 6.86rem;
      height: 7.25rem;
      margin: 0 auto;
      margin-top: 0.34rem;
      border-radius: .16rem;
      // box-shadow: 0 0.02rem 0.2rem rgba(0,0,0,0.1);
      border: 1px solid #e8e8e8;
    }

    .table {
      margin-top: 0.68rem;

      .table_tit {
        text-align: left;
        position: relative;
        margin-top: -.30rem;
        padding-left: .62rem;
        font: .36rem/.80rem -apple-system-font,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,Helvetica Neue,PingFang SC,Hiragino Sans GB,Microsoft YaHei UI,Microsoft YaHei,Arial;
      }

      .table_tit:before {
        content: "";
        width: .16rem;
        height: .16rem;
        background-color: #e10000;
        position: absolute;
        left: .34rem;
        top: .32rem;
      }

      .table_title {
        display: flex;
        flex-direction: row;
        height: .8rem;
        text-align: center;
        line-height: .8rem;
        width: 100%;
        background: #fff;

        p{ flex: 1; }

        .title {
          font-size: 0.20rem;
          text-align: center;
        }

        .classify_title {
          font-weight: 700;
        }
      }

      .dom_flex {
        position: fixed;
        top: 0;
      }

    }

   }
 }
</style>

<style>
.amap-info-close {
  right: 5px !important;
}
.amap-copyright {
  display: none !important;
}
</style>
