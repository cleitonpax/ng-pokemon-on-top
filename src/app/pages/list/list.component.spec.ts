import { ListComponent } from './list.component';
import { ListState } from 'src/app/store/reducers/list.reducer';
import { Store } from '@ngrx/store';
import { getListAction } from 'src/app/store/actions/list.actions';
import { of } from 'rxjs';

describe('ListComponent', () => {
  let component: ListComponent;
  let store: jasmine.SpyObj<Store<{ list: ListState }>>;

  beforeEach(() => {
    store = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    store.select.and.returnValue(of({}));

    component = new ListComponent(store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch getListAction on initialization', () => {
    expect(store.dispatch).toHaveBeenCalledWith(
      getListAction({ page: component.page, limit: component.limit })
    );
  });

  it('should update page and dispatch getListAction on page change', () => {
    const newPage = 2;
    component.onPageChanged(newPage);

    expect(component.page).toEqual(newPage);
    expect(store.dispatch).toHaveBeenCalledWith(
      getListAction({ page: newPage, limit: component.limit })
    );
  });
});