import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'

export interface TCartState {
  list: TProductList[];
}

class Cart extends VuexModule implements TCartState {
  public list = []
}

export const CartModule = getModule(Cart)
