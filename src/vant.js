import { createApp } from 'vue'
import {
  Tabbar,
  TabbarItem,
  Search,
  Icon,
  Swipe,
  SwipeItem,
  Sticky,
  Image as VanImage,
  Lazyload,
  Sidebar,
  SidebarItem,
  Card,
  List,
  Divider,
  Loading,
  NavBar
} from 'vant'
import 'vant/lib/index.css'

const app = createApp()

app.use(Tabbar)
app.use(TabbarItem)
app.use(Search)
app.use(Icon)
app.use(Swipe)
app.use(SwipeItem)
app.use(Sticky)
app.use(VanImage)
app.use(Lazyload)
app.use(Sidebar)
app.use(SidebarItem)
app.use(Card)
app.use(List)
app.use(Divider)
app.use(Loading)
app.use(NavBar)