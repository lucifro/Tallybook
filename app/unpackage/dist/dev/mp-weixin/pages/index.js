"use strict";
const common_vendor = require("../common/vendor.js");
const api_index = require("../api/index.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.onShow(() => {
      listdata.value = {};
      getdatalist();
    });
    const listdata = common_vendor.ref({});
    common_vendor.ref(true);
    const getdatalist = async () => {
      let res = await api_index.list();
      if (res.code == "200") {
        listdata.value = res.enity;
      } else {
        common_vendor.index.showToast({
          title: res.msg,
          icon: "error"
        });
      }
    };
    const createRecords = () => {
      common_vendor.index.navigateTo({
        url: "/pages/create/index"
      });
    };
    const editRecords = (id) => {
      console.log(id, "index");
      common_vendor.index.navigateTo({
        url: `/pages/edit/index?id=${id}`
      });
    };
    const delbook = async (id) => {
      let res = await api_index.dellist({
        id
      });
      if (res.code == "200") {
        common_vendor.index.showToast({
          title: "删除成功",
          icon: "success"
        });
        getdatalist();
      } else {
        common_vendor.index.showToast({
          title: res.msg,
          icon: "error"
        });
      }
    };
    const quit = () => {
      common_vendor.index.removeStorageSync("token");
      common_vendor.index.navigateTo({
        url: "/pages/login/index"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(quit),
        b: common_vendor.o(createRecords),
        c: common_vendor.f(listdata.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.time.substring(0, 9)),
            b: common_vendor.o(($event) => delbook(item._id), index),
            c: common_vendor.n(item.type == "1" ? "main_button_time" : "main_button_times"),
            d: common_vendor.t(item.title),
            e: common_vendor.t(item.type == "1" ? "收入" : "支出"),
            f: common_vendor.t(item.account),
            g: common_vendor.o(($event) => editRecords(item._id), index),
            h: index
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-02281a80"], ["__file", "E:/book/node/nodejob/app/Tallybook/pages/index.vue"]]);
wx.createPage(MiniProgramPage);
