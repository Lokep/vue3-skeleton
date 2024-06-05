<style lang="scss" scoped>
.slide-enter-active {
  transition: all 0.3s ease;
}
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter,
.slide-leave-to {
  height: 0;
}

.screen {
  @apply w-screen h-screen flex items-center justify-center;
}
</style>

<template>
  <DefineReusableTemplate>
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <Transition
          :enter-active-class="`animate__animated animate__${enterActiveName}`"
          :leave-active-class="`animate__animated animate__${leaveActiveName}`"
          mode="out-in"
        >
          <Suspense>
            <!-- 主要内容 -->
            <component
              :is="Component"
            ></component>
            <!-- 加载中状态 -->
            <template #fallback> 正在加载... </template>
          </Suspense>
        </Transition>
      </template>
    </RouterView>
  </DefineReusableTemplate>

  <div class="page" v-if="online">
    <div class="screen" v-if="!isFinshInvoked">
      <van-loading>方法注入中...</van-loading>
    </div>

    <!--
      导航栏
      - 小程序中，web-view不可以自定义导航栏，只能使用系统默认的导航栏
    -->
    <van-pull-refresh
      v-model="refreshing"
      v-else
      :disabled="!metaData.canPullDownRefresh"
      @refresh="onRefresh"
    >
      <div class="h-screen w-screen overflow-y-scroll" ref="scroller">
        <ReuseTemplate></ReuseTemplate>

        <Transition name="slide" mode="out-in">
          <div
            class="w-screen h-12 flex items-center justify-center relative overflow-hidden"
            v-show="isReachingBottom && metaData.canReachBottom"
          >
            <van-loading type="spinner" color="#1989fa" size="24px"
              >加载中...</van-loading
            >
          </div>
        </Transition>
      </div>
    </van-pull-refresh>
  </div>

  <div class="screen" v-else>
    <van-empty image="network" description="网络连接失败" />
  </div>
</template>

<script setup lang="ts">
/**
 * 1. 检查网络
 * 2. 登录状态
 * 3. UA 获取
 *
 * - 向slot内注入方法
 * - onPullDownRefresh
 * - onReachBottom
 * - onEmpty
 * - onError
 *
 * - onShow
 * - onHide
 * 可以使用provide/inject向下传递方法
 *
 * - onPopState
 *
 * - inWechat
 * - inWecom
 * - inWeapp
 */
import { EPlatform, type ICustomRouteMeta } from '@/types/page.d';
import { sleep } from '@/utils';
import {
  createReusableTemplate,
  useFavicon,
  useOnline,
  useScroll,
} from '@vueuse/core';
import { isArray } from 'lodash-es';
import { onBeforeMount, provide, ref, watch } from 'vue';
import { RouterView, useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter()

const metaData = ref<ICustomRouteMeta>({});

const enterActiveName = ref('');
const leaveActiveName = ref('');

router.beforeEach(async (to, from, next) => {
  const { transitionName, platform = EPlatform.PC  } = to.meta as ICustomRouteMeta;

  if (transitionName && isArray(transitionName)) {
    setTransitionName(transitionName);
  }

  await checkPlatform(platform as EPlatform);

  next();
})

onBeforeMount(async () => {
  await sleep();

  metaData.value = route.meta as ICustomRouteMeta;

  isInvoking.value = true;
  isFinshInvoked.value = false;

  refreshTasks.value = [];
  reachBottomTasks.value = [];

  updateFavicon();
  handleAuthCheck();
  handleCacheControl();
  handleInvokes();
  console.log('invokes', isFinshInvoked.value);
});

const checkPlatform = (platform: EPlatform) => {

  if (platform === EPlatform.H5) {
    return import('amfe-flexible').then((res) => {
      console.log('amfe-flexible', res);
    })
  }
}

const setTransitionName = ([enter, leave]: string[] ) => {
  enterActiveName.value = enter;
  leaveActiveName.value = leave;
};


const icon = useFavicon();
const updateFavicon = () => {
  const { icon: i } = metaData.value;

  if (i) {
    icon.value = i;
  }
};

const handleAuthCheck = () => {
  const { checkAuth = false, checkAuthFallback = () => {} } = metaData.value;
  // todo 还要检查token
  if (checkAuth) {
    checkAuthFallback();
  }
};

const handleCacheControl = () => {
  const { cacheControl = true } = metaData.value;

  if (!cacheControl) {
    localStorage.clear();
    sessionStorage.clear();
  }
};

const isInvoking = ref(false);
const isFinshInvoked = ref(false);
const handleInvokes = async () => {
  const { invokes = [] } = metaData.value;

  console.log('[invokes]', invokes);

  for (let i = 0; i < invokes.length; i++) {
    const invoke = invokes[i];

    await invoke();
  }

  isInvoking.value = false;
  isFinshInvoked.value = true;
};

const [DefineReusableTemplate, ReuseTemplate] = createReusableTemplate();

const scroller = ref<HTMLElement | null>(null);
const { isScrolling, arrivedState, y } = useScroll(scroller, {
  behavior: 'smooth',
  offset: {
    bottom: 50,
  },
});

const isReachingBottom = ref(false);
const reachBottomTasks = ref<(<T>() => T | Promise<T>)[]>([]);
const collectReachBottomTasks = (callback: <T>() => T | Promise<T>) => {
  reachBottomTasks.value.push(callback);
};
provide('onReachBottom', collectReachBottomTasks);

watch(
  () => arrivedState.bottom,
  (val) => {
    if (val && isReachingBottom.value === false) {
      isReachingBottom.value = true;
      onReachBottom();
    }
  },
);

const onReachBottom = async () => {
  for (let i = 0; i < reachBottomTasks.value.length; i++) {
    const excute = reachBottomTasks.value[i];

    try {
      await excute();
    } catch (error) {
      console.error(error);
    }
  }

  isReachingBottom.value = false;
  console.log('onReachBottom is excuted');
};

const online = useOnline();

const refreshing = ref(false);
const refreshTasks = ref<(() => Promise<any>)[]>([]);

provide('onPullDownRefresh', (callback: <T>() => T | Promise<T>) => {
  refreshTasks.value.push(callback);
});

const onRefresh = async () => {
  refreshing.value = true;

  for (let i = 0; i < refreshTasks.value.length; i++) {
    const excute = refreshTasks.value[i];

    try {
      await excute();
    } catch (error) {
      console.error(error);
    }
  }

  console.log('onRefresh is excuted');

  refreshing.value = false;
};
</script>
