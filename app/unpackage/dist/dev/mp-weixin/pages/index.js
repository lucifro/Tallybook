"use strict";
const common_vendor = require("../common/vendor.js");
const common_assets = require("../common/assets.js");
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
      common_vendor.index.__f__("log", "at pages/index.vue:110", id, "index");
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
      return common_vendor.e({
        a: common_vendor.o(quit),
        b: common_vendor.o(createRecords),
        c: common_vendor.t(listdata.value.length || 0),
        d: common_vendor.f(listdata.value, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.time.substring(0, 10)),
            b: common_vendor.t(item.time.substring(11, 16)),
            c: common_vendor.o(($event) => delbook(item._id), index),
            d: common_vendor.n(item.type == "1" ? "income-header" : "expense-header"),
            e: common_vendor.t(item.title),
            f: item.remarks
          }, item.remarks ? {
            g: common_vendor.t(item.remarks)
          } : {}, {
            h: common_vendor.t(item.type == "1" ? "收入" : "支出"),
            i: common_vendor.n(item.type == "1" ? "income-badge" : "expense-badge"),
            j: common_vendor.t(item.type == "1" ? "+" : "-"),
            k: common_vendor.t(item.account),
            l: common_vendor.n(item.type == "1" ? "income-amount" : "expense-amount"),
            m: common_vendor.o(($event) => editRecords(item._id), index),
            n: index
          });
        }),
        e: common_assets._imports_0,
        f: !listdata.value || listdata.value.length === 0
      }, !listdata.value || listdata.value.length === 0 ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-02281a80"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../.sourcemap/mp-weixin/pages/index.js.map
