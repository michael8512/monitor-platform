<template>
  <div class="person-car-status">
    <div class="panel-title">人车概况</div>
    <div class="panel-content">
      <div class="panel-content-item" :class="item.type" v-for="item in list" :key="item.type">
        <div class="label">{{item.label}}</div>
        <div class="value">
          <div class="value-bar" :style="`width: ${item.percent}`"></div>
          <div class="value-number">{{item.total}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from 'utils/http';
import { mapState } from "vuex";

export default {
  name: 'person-car-status',
  data(){
    return {
      list: [
        {
          type: 'person',
          label: '在场人员',
          total: 0,
          percent: '67%',
        },
        {
          type: 'car',
          label: '在场车辆',
          total: 0,
          percent: '27%',
        },
      ]
    }
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapState([]),
  },
  methods: {
    getData() {
      get(`/api/construction/getPersoncar`).then(res=>{
        const {car, person} = res.data;
        const total = car + person;
        const list = this.list;

        list[0].total = car;
        list[0].percent = 100*car/total+'%';
        list[1].total = person;
        list[1].percent = 100*person/total+'%';
      })
    }
  }
}
</script>
<style lang="scss">
.person-car-status {

  .panel-content {
    padding: 2.4rem 0 1.6rem;
    
    &-item {
      display: flex;
      justify-content: space-between;

      .label {
        font-family: MicrosoftYaHei;
        font-size: 1.4rem;
        color: rgba(179, 179, 179, 1);
      }

      .value {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        width: calc(100% - 7rem);
	      height: 1.8rem;
        border: solid 1px rgba(34, 57, 77, 1);

        &-bar {
          height: 0.9rem;
          margin-left: 0.2rem;
          margin-right: 1rem;
          background-color: rgba(25, 220, 231, 1);
          border-radius: 0.5rem;
        }

        &-number {
          font-family: DINPro-Regular;
          font-size: 2rem;
          color: rgba(25, 220, 231, 1);
        }
      }
    }

    .car {
      margin-top: 1.6rem;

      .value-bar {
        background-color: rgba(25, 166, 231, 1);
      }

      .value-number {
        color: rgba(25, 166, 231, 1);
      }
    }
  }
}
</style>
