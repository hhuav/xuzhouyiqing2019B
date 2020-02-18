<template>
  <div class="layout">
    <Sider :style="{position: 'fixed', height: '100%', left: 0, overflow: 'auto'}">
      <Menu active-name="1-1" theme="dark" width="auto" :open-names="['1']" @on-select="changeCase">
        <Submenu name="1">
          <template slot="title">
            <Icon type="ios-navigate"></Icon>病例管理
          </template>
          <MenuItem name="1-1">新增疫情确诊患者</MenuItem>
          <MenuItem name="1-2">更新县区病例</MenuItem>
          <MenuItem name="1-3" @click="selectCase">疫情确诊患者列表</MenuItem>
          <MenuItem name="1-4">疫情基础信息</MenuItem>
        </Submenu>
      </Menu>
    </Sider>
    <Layout :style="{marginLeft: '200px'}">
      <Header :style="{background: '#515a6e'}"><span class="textSpan">抗击疫情，鸿鹄与你们同在！</span></Header>
      <Content :style="{padding: '0 16px 16px'}">
        <Breadcrumb :style="{margin: '16px 0'}">
          <BreadcrumbItem>{{headerName}}</BreadcrumbItem>
        </Breadcrumb>
        <Card>
          <div class="form" v-if="headerName == '新增疫情确诊患者'">
            <Form :model="formItem" :label-width="80" label-position="left">
              <FormItem label="姓名：">
                <Input v-model="formItem.name" placeholder="请输入姓名" />
              </FormItem>
              <FormItem label="性别：">
                <RadioGroup v-model="formItem.radio">
                  <Radio label="男">男</Radio>
                  <Radio label="女">女</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem label="年龄：">
                <Input v-model="formItem.age" placeholder="请输入年龄" />
              </FormItem>
              <FormItem label="地址：">
                <Input v-model="formItem.address" placeholder="请输入地址" />
              </FormItem>
              <FormItem label="详情：">
                <Input type="textarea" :rows="5" v-model="formItem.detail" placeholder="请输入详细情况" />
              </FormItem>
              <FormItem label="经度：">
                <Input v-model="formItem.lng" placeholder="请输入经度" />
              </FormItem>
              <FormItem label="纬度：">
                <Input v-model="formItem.lat" placeholder="请输入纬度" />
              </FormItem>
              <!-- <FormItem label="高度：">
                <Input v-model="formItem.height" placeholder="请输入高度" />
              </FormItem> -->
            </Form>
            <div>
              <Button type="success" @click="openUrl()">点击拾取经纬度</Button>&emsp;&emsp;&emsp;&emsp;
              <Button type="primary" @click="addCase()">提交</Button>   
            </div>
          </div>
          <div v-if="headerName == '更新区县病例'">
            <Table border :columns="countyCase" :data="countyCaseData">
              <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">确定</Button>
                <Button type="error" size="small" @click="remove(index)">取消</Button>
              </template>
            </Table>
          </div>
          <div v-if="headerName == '疫情确诊患者列表'">
            <Table border :columns="columns" :data="patientList" height="713"></Table>
            <Page class="page" :total="dataCount" :page-size="pageSize" show-total  @on-change="changepage"></Page>
            <Modal v-model="openCaseInfo" title="修改患者信息" @on-ok="closeCase">
                <Form :model="formItem" :label-width="70" label-position="left">
                    <FormItem label="姓名：">
                        <Input v-model="formItem.name" placeholder="请输入姓名" />
                    </FormItem>
                    <FormItem label="性别：">
                        <RadioGroup v-model="formItem.radio">
                        <Radio label="男">男</Radio>
                        <Radio label="女">女</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="年龄：">
                        <Input v-model="formItem.age" placeholder="请输入年龄" />
                    </FormItem>
                    <FormItem label="地址：">
                        <Input v-model="formItem.address" placeholder="请输入地址" />
                    </FormItem>
                    <FormItem label="详情：">
                        <Input type="textarea" :rows="5" v-model="formItem.detail" placeholder="请输入详细情况" />
                    </FormItem>
                    <FormItem label="经度：">
                        <Input v-model="formItem.lng" placeholder="请输入经度" />
                    </FormItem>
                    <FormItem label="纬度：">
                        <Input v-model="formItem.lat" placeholder="请输入纬度" />
                    </FormItem>
                    <!-- <FormItem label="高度：">
                        <Input v-model="formItem.height" placeholder="请输入高度" />
                    </FormItem> -->
                </Form>
                <div class="buttonDiv">
                  <Button type="success" @click="openUrl()">点击拾取经纬度</Button>
                </div>
            </Modal>
          </div>
          <div v-if="headerName == '疫情基础信息'">
            <Form ref="formInline" :model="formInline" :rules="ruleInline">
              <Row>
               <Col span="5">
                <FormItem prop="title">
                  <Input type="text" v-model="formInline.title" placeholder="标题">
                    <Icon type="md-attach" slot="prepend"></Icon>
                  </Input>
                </FormItem>
               </Col>
               <Col span="15" offset="1">
                <FormItem prop="details">
                  <Input type="text" v-model="formInline.details" placeholder="详情">
                    <Icon type="md-create" slot="prepend"></Icon>
                  </Input>
                </FormItem>
               </Col>
               <Col span="1"> &nbsp; </Col>
               <Col span="2">
                <FormItem>
                  <Button type="primary" @click="handleSubmit('formInline')" long>添加</Button>
                </FormItem>
               </Col>
              </Row>
            </Form>
            <Table border :columns="basicInfo" :data="basicInfoData">
              <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="showBasicInfo(index)">确定</Button>
                <Button type="error" size="small" @click="removeBasicInfo(index)">取消</Button>
                <Button type="error" size="small" @click="deleteBasicInfo(index, row)">删除</Button>
              </template>
            </Table>
          </div>
        </Card>
      </Content>
    </Layout>
  </div>
</template>
<script>
export default {
  name: "DiseaseManagement",
  data() {
    return {
      headerName: "新增疫情确诊患者",
      formInline: {
        title: '',
        details: ''
      },
      ruleInline: {
        title: [
          { required: true, message: 'Please fill in the user name', trigger: 'blur' }
        ],
        details: [
          { required: true, message: 'Please fill in the password.', trigger: 'blur' },
          { type: 'string', min: 1, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
        ]
      },
      formItem: {
        name: "",
        radio: "",
        age: "",
        address: "",
        detail: "",
        lng: "",
        lat: "",
        height: ""
      },
      thisMomentRow:{},
      thisMomentCountyCase:{ case: null, data: null, flag: false },
      thisMomentCountyBegin: null,
      thisMomentCountyType: null,
      countyCase:[
        {
          title: '区域',
          key: 'area'
        },
        {
          title: '确诊',
          key: 'confirm',
          render: (h, params) => {
            return h('input', {
              domProps:{
                value: this.countyCaseData[ params.row.ind ].confirm,
                maxlength: 255
              },
              on:{  
                'blur': (event) => {
                  params.row.invoiceCode = event.target.value;
                  this.tableAction( params, event, 'confirm', this.countyCaseData );
                  this.thisMomentCountyType = 'confirm';
                }
              }
            });
          }
        },
        {
          title: '治愈',
          key: 'heal',
          render: (h, params) => {
            return h('input', {
              domProps:{
                value: this.countyCaseData[ params.row.ind ].heal,
                maxlength: 255
              },
              on:{  
                'blur': (event) => {
                  params.row.invoiceCode = event.target.value
                  this.tableAction( params, event, 'heal', this.countyCaseData );
                  this.thisMomentCountyType = 'heal';
                }
              }
            });
          }
        },
        {
          title: '疑似',
          key: 'suspect',
          render: (h, params) => {
            return h('input', {
              domProps:{
                value: this.countyCaseData[ params.row.ind ].suspect,
                maxlength: 255
              },
              on:{  
                'blur': (event) => {
                  params.row.invoiceCode = event.target.value
                  this.tableAction( params, event, 'suspect', this.countyCaseData );
                  this.thisMomentCountyType = 'suspect';
                }
              }
            });
          }
        },
        {
          title: '死亡',
          key: 'dead',
          render: (h, params) => {
            return h('input', {
              domProps:{
                value: this.countyCaseData[ params.row.ind ].dead,
                maxlength: 255
              },
              on:{  
                'blur': (event) => {
                  params.row.invoiceCode = event.target.value
                  this.tableAction( params, event, 'dead', this.countyCaseData );
                  this.thisMomentCountyType = 'dead';
                }
              }
            });
          }
        },
        {
          title: 'Action',
          slot: 'action',
          width: 150,
          align: 'center'
        }
            
      ],
      basicInfo:[
        {
          title: '标题',
          key: 'type',
          render: (h, params) => {
            return h('input', {
              class: 'input_class',
              domProps:{
                value: this.basicInfoData[ params.row.ind ].type,
              },
              on:{  
                'blur': (event) => {
                  params.row.invoiceCode = event.target.value;
                  this.tableAction( params, event, 'type', this.basicInfoData );
                  this.thisMomentCountyType = 'type';
                }
              }
            });
          }
        },
        {
          title: '详情',
          key: 'details',
          render: (h, params) => {
            return h('input', {
              class: 'input_class',
              domProps:{
                value: this.basicInfoData[ params.row.ind ].details,
              },
              on:{  
                'blur': (event) => {
                  params.row.invoiceCode = event.target.value;
                  this.tableAction( params, event, 'details', this.basicInfoData );
                  this.thisMomentCountyType = 'details';
                }
              }
            });
          }
        },
        {
          title: 'Action',
          slot: 'action',
          width: 250,
          align: 'center'
        }
            
      ],
      countyCaseData: [],
      basicInfoData: [],
      openCaseInfo: false,
      patientList: [],
      patientListCopy: [],
      updateId: null,
      dataCount: 0,//初始化信息总数
      pageSize: 14,//每页显示信息数量
      columns: [
                    {
                        title: '姓名',
                        width: 100,
                        key: 'patientName',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.patientName)
                            ]);
                        }
                    },
                    {
                        title: '性别',
                        width: 100,
                        key: 'sex'
                    },
                    {
                        title: '年龄',
                        width: 100,
                        key: 'age'
                    },
                    {
                        title: '地址',
                        key: 'addr'
                    },
                    {
                        title: '经度',
                        width: 120,
                        key: 'longitude'
                    },
                    {
                        title: '纬度',
                        width: 120,
                        key: 'latitude'
                    },
                    // {
                    //     title: '高度',
                    //     width: 100,
                    //     key: 'height'
                    // },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.updateCase(params.row)
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.deleteCase(params.row.id,params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
    }
  },
  mounted() {
    this.initData(); //县区疫情
    this.initBaseInfoData(); //基础疫情
  },
  methods: {
    changeCase(name) {
      if (name == "1-1") {
        this.headerName = "新增疫情确诊患者";
        this.formItem.name = "";
        this.formItem.radio = "";
        this.formItem.age = null;
        this.formItem.address = "";
        this.formItem.detail = "";
        this.formItem.lng = null;
        this.formItem.lat = null;
        this.formItem.height = null;
      } else if (name == "1-2") {
        this.headerName = "更新区县病例";
      } else if (name == "1-3") {
          this.headerName = "疫情确诊患者列表";
          this.$axios.post("xzPatient/queryList").then(data => {
                this.patientListCopy = data.data.data.list;
                this.dataCount = data.data.data.list.length;
                if(data.data.data.list.length < this.pageSize){
                    this.patientList = this.patientListCopy;
                }else{
                    this.patientList = this.patientListCopy.slice(0,this.pageSize);
                }
            }).catch(response => {
                console.log("getDataErr:" + response);
            });
      } else if (name == "1-4") {
        this.headerName = "疫情基础信息";
      } 
    },
    changepage(index){
        var _start = ( index - 1 ) * this.pageSize;
        var _end = index * this.pageSize;
        this.patientList = this.patientListCopy.slice(_start,_end);
    },
    //新增病例
    addCase() {
      this.$axios.post("xzPatient/save",{
          patientName: this.formItem.name,
          sex: this.formItem.radio,
          age: this.formItem.age,
          addr: this.formItem.address,
          details: this.formItem.detail,
          longitude: this.formItem.lng,
          latitude: this.formItem.lat,
          height: this.formItem.height,
      }).then(data => {
        if (data.data.success && data.data.code == 1000) {
            this.$Message.success('操作成功！');
        } else {
             this.$Message.error('添加失败，请重新提交！');
        }
      }).catch(response => {
        console.log("getDataErr:" + response);
      });
    },
    //查看病例
    selectCase() {
      this.headerName = "病例列表";
    },
    // 初始化县区疫情
    initData() {
      this.$axios.post("xzRegionEpidemicSituation/queryList").then(data => {
        this.countyCaseData = [];
        data.data.data.list.forEach( (item, ind) => {
          this.countyCaseData.push({
            id: item.id, 
            area: item.area,
            confirm: item.confirm,
            heal: item.heal ? item.heal: 0,
            suspect: item.suspect ? item.suspect: 0,
            dead: item.dead ? item.dead: 0,
            $isEdit: true,
            ind
          })
        })
      }).catch(response => {
        console.log("getDataErr:" + response);
      });
    },
    // 基础疫情
    initBaseInfoData() {
      this.basicInfoData = [];
      this.$axios.get("epidemicSituation/queryList").then(data => {
        data.data.data.list.forEach( (item, ind) => {
          this.basicInfoData.push({
            id: item.id, 
            type: item.type,
            details: item.details,
            ind
          })
        })
      }).catch(response => {
        console.log("getDataErr:" + response);
      });
    },
    // 灾情简介新增提交事件
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$axios.post("epidemicSituation/save",{
            type: this.formInline.title,
            details: this.formInline.details
          }).then(data => {
            if (data.data.success && data.data.code == 1000) {
              this.$Message.success('添加成功！');
              this.initBaseInfoData();
              this.formInline = { title: '', details: '' };
            } else {
              this.$Message.error('添加失败！');
            }
          }).catch(response => {
            console.log("getDataErr:" + response);
          });
        } else {
          this.$Message.error('请填写信息!');
        }
      })
    },
    //疫情简介编辑
    showBasicInfo (index) {
      if( this.thisMomentCountyCase.flag ) {
        // this.basicInfoData[ this.thisMomentCountyCase.case ]
        this.$axios.post("epidemicSituation/update",{
          id: this.basicInfoData[ this.thisMomentCountyCase.case ].id,
          type: this.basicInfoData[ this.thisMomentCountyCase.case ].type,
          details: this.basicInfoData[ this.thisMomentCountyCase.case ].details
        }).then(data => {
          if (data.data.success && data.data.code == 1000) {
            this.$Message.success('修改成功！');
            this.initBaseInfoData();
          } else {
            this.$Message.error('修改失败！');
          }
        }).catch(response => {
          console.log("getDataErr:" + response);
        });
        this.thisMomentCountyCase.flag = false;
      } else {
        this.$Message.error('请修改一些数据');
      }

    },
    //疫情简介表格操作
    removeBasicInfo (index) {
      if( this.thisMomentCountyCase.flag ) {
        this.basicInfoData[ this.thisMomentCountyCase.case ][this.thisMomentCountyType] = this.thisMomentCountyBegin;
        this.thisMomentCountyCase.flag = false;
      } else {
        this.$Message.error('请修改一些数据');
      }
    },
    // 疫情简介删除
    deleteBasicInfo(ind, row) {
      this.$Modal.confirm({
        title: '删除操作',
        content: '<p>你确定要删除吗？</p>',
        onOk: () => {
          this.$axios.post("epidemicSituation/delete",{
            id: row.id
          }).then(data => {
            if (data.data.success && data.data.code == 1000) {
              this.$Message.success('删除成功！');
              this.initBaseInfoData();
            } else {
              this.$Message.error('删除失败！');
            }
          }).catch(response => {
            console.log("getDataErr:" + response);
          });
        },
        onCancel: () => {}
      });
    },
    // 表格公共事件
    tableAction( params, event, type, data ) {
      if(!this.thisMomentCountyCase.flag ) {
        this.thisMomentCountyBegin = data[ params.row.ind ][type];
      }
      this.thisMomentCountyCase.flag = true;
      this.thisMomentCountyCase = {
        flag: true,
        case: params.row.ind,
        data: event.target.value
      }
      data[ params.row.ind ][type] = event.target.value
    },
    
    show (index) {
      if( this.thisMomentCountyCase.flag ) {
        // this.countyCaseData[ this.thisMomentCountyCase.case ]
        this.$axios.post("xzRegionEpidemicSituation/update",{
          id: this.countyCaseData[ this.thisMomentCountyCase.case ].id,
          confirm: this.countyCaseData[ this.thisMomentCountyCase.case ].confirm,
          heal: this.countyCaseData[ this.thisMomentCountyCase.case ].heal,
          dead: this.countyCaseData[ this.thisMomentCountyCase.case ].dead,
          suspect: this.countyCaseData[ this.thisMomentCountyCase.case ].suspect,
          area: this.countyCaseData[ this.thisMomentCountyCase.case ].area,
        }).then(data => {
          if (data.data.success && data.data.code == 1000) {
            this.$Message.success('修改成功！');
          } else {
            this.$Message.error('修改失败！');
          }
        }).catch(response => {
          console.log("getDataErr:" + response);
        });
        this.thisMomentCountyCase.flag = false;
      } else {
        this.$Message.error('请修改一些数据');
      }

    },
    remove (index) {
      if( this.thisMomentCountyCase.flag ) {
        this.countyCaseData[ this.thisMomentCountyCase.case ][this.thisMomentCountyType] = this.thisMomentCountyBegin;
        this.thisMomentCountyCase.flag = false;
      } else {
        this.$Message.error('请修改一些数据');
      }
    },
    updateCase(list) {
        this.openCaseInfo = true;
        this.updateId = list.id;
        this.formItem.name = list.patientName;
        this.formItem.radio = list.sex;
        this.formItem.age = list.age;
        this.formItem.address = list.addr;
        this.formItem.detail = list.details;
        this.formItem.lng = list.longitude;
        this.formItem.lat = list.latitude;
        this.formItem.height = list.height;
    },
    deleteCase(id,index) {
        this.$Modal.confirm({
          title: '删除操作',
          content: '<p>你确定要删除该患者吗？</p>',
          onOk: () => {
            this.$axios.post("xzPatient/deleteById",{id:id}).then(data => {
              if (data.data.success && data.data.code == 1000) {
                  this.$Message.success('删除成功！');
                  this.patientList.splice(index, 1);
              } else {
                  this.$Message.error('删除失败！');
              }
            }).catch(response => {
              console.log("getDataErr:" + response);
            });
          },
          onCancel: () => {}
        });
    },
    closeCase() {
        this.$axios.post("xzPatient/update",{
          id: this.updateId,
          patientName: this.formItem.name,
          sex: this.formItem.radio,
          age: this.formItem.age,
          addr: this.formItem.address,
          details: this.formItem.detail,
          longitude: this.formItem.lng,
          latitude: this.formItem.lat,
          height: this.formItem.height,
      }).then(data => {
        if (data.data.success && data.data.code == 1000) {
            this.patientList.forEach((item,index)=>{
              if (item.id == this.updateId) {
                item.patientName = this.formItem.name;
                item.sex = this.formItem.radio;
                item.age = this.formItem.age;
                item.addr = this.formItem.address;
                item.details = this.formItem.detail;
                item.longitude = this.formItem.lng;
                item.latitude = this.formItem.lat;
                item.height = this.formItem.height;
              }
            });
            this.$Message.success('修改成功！');
            this.openCaseInfo = false;
        } else {
             this.$Message.error('修改失败，请重新修改！');
        }
      }).catch(response => {
        console.log("getDataErr:" + response);
      });
    },
    //打开高德坐标拾取器
    openUrl() {
      window.open("https://lbs.amap.com/console/show/picker");
    }
  }
};
</script>
<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  height: 100%;
}
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.form {
  padding: 10px 35%;
}
.page {
    margin-top: 35px;
}
.textSpan {
    font-size: 30px;
    color: #F66306;
}
.buttonDiv {
  width: 100%;
  text-align: center;
}
</style>
<style>
.ivu-layout {
  height: 100%;
}
.ivu-card-bordered {
  height: 94%;
}
.ivu-menu-vertical .ivu-menu-item,
.ivu-menu-vertical .ivu-menu-submenu-title {
  padding: 21px 24px;
}
.ivu-table-header thead tr th {
    text-align: center;
}
.ivu-table-border td, .ivu-table-border th {
    text-align: center;
}
.input_class {
  width: 100%;
}
</style>