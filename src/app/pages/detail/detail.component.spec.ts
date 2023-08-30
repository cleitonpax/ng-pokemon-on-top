import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';

import { ActivatedRoute } from '@angular/router';
import { DetailComponent } from './detail.component';
import { PokemonService } from 'src/app/services/pokemon.service';
import { getDetailAction } from 'src/app/store/actions/detail.actions';
import { of } from 'rxjs';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let mockRoute: any;
  let mockApi: any;
  let mockStore: any;

  const mockDetailState = {
    data: {}, // Mock your desired state here
    loading: false,
    error: null
  };

  beforeEach(async () => {
    mockRoute = {
      snapshot: {
        paramMap: {
          get: (paramName: string) => {
            if (paramName === 'name') {
              return 'pikachu'; // Provide a mock name for testing
            }
            return null;
          }
        }
      }
    };

    mockApi = jasmine.createSpyObj('PokemonService', ['getPokemonAvatarById']);
    mockApi.getPokemonAvatarById.and.returnValue('mock-avatar-url'); // Mock avatar URL

    mockStore = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    mockStore.select.and.returnValue(of(mockDetailState));

    await TestBed.configureTestingModule({
      declarations: [DetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockRoute },
        { provide: PokemonService, useValue: mockApi },
        { provide: Store, useValue: mockStore }
      ],
      imports: [StoreModule.forRoot({})] // Add your store configuration here
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch Pokemon avatar URL', () => {
    const avatarUrl = component.getPokemonAvatar(25); // Provide a mock ID
    expect(avatarUrl).toBe('mock-avatar-url');
  });

  it('should get characteristic description', () => {
    const mockCharacteristic: any = {
      descriptions: [
        { language: { name: 'en' }, description: 'Mock Description' }
      ]
    };
    const description = component.getCharacteristic(mockCharacteristic);
    expect(description).toBe('Mock Description');
  });

  it('should dispatch getDetailAction when initialized', () => {
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      getDetailAction({ name: 'pikachu' })
    );
  });
});
