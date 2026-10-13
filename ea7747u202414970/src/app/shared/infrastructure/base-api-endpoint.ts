import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable} from 'rxjs';
import {BaseEntity} from '../domain/model/base-entity';
import {BaseResource, BaseResponse} from './base-response';
import {BaseAssembler} from './base-assembler';
import {ErrorHandlingEnabledBaseType} from './error-handling-enabled-base-type';


/**
 * Generic endpoint that offers the CRUD operations of a REST collection.
 *
 * @remarks
 * It talks to the backend through HttpClient and delegates the translation
 * between resources and domain entities to an assembler, so callers only
 * work with domain entities.
 *
 * @typeParam TEntity - The domain entity type.
 * @typeParam TResource - The resource type exchanged with the API.
 * @typeParam TResponse - The response envelope type returned by the API.
 * @typeParam TAssembler - The assembler used to translate resources and entities.
 *
 * @author Carla Gallardo
 */
export abstract class BaseApiEndpoint<
  TEntity extends BaseEntity,
  TResource extends BaseResource,
  TResponse extends BaseResponse,
  TAssembler extends BaseAssembler<TEntity, TResource, TResponse>
> extends ErrorHandlingEnabledBaseType {
  /**
   * Creates an endpoint bound to a REST collection.
   *
   * @param http - The HttpClient used to perform the requests.
   * @param endpointUrl - The absolute URL of the REST collection.
   * @param assembler - The assembler used to translate resources and entities.
   */
  protected constructor(
    protected http: HttpClient,
    protected endpointUrl: string,
    protected assembler: TAssembler
  ) {
    super();
  }


  /**
   * Retrieves all the entities of the collection.
   *
   * @remarks
   * Supports both a plain array of resources and a response envelope.
   *
   * @returns An observable with the list of entities.
   */
  getAll(): Observable<TEntity[]> {
    return this.http.get<TResponse | TResource[]>(this.endpointUrl).pipe(
      map(response => Array.isArray(response)
        ? response.map(resource => this.assembler.toEntityFromResource(resource))
        : this.assembler.toEntitiesFromResponse(response)),
      catchError(this.handleError('Failed to fetch entities'))
    );
  }

  /**
   * Retrieves a single entity by its identifier.
   *
   * @param id - The identifier of the entity.
   * @returns An observable with the entity.
   */
  getById(id: number): Observable<TEntity> {
    return this.http.get<TResource>(`${this.endpointUrl}/${id}`).pipe(
      map(resource => this.assembler.toEntityFromResource(resource)),
      catchError(this.handleError('Failed to fetch entity'))
    );
  }


  /**
   * Creates a new entity in the collection.
   *
   * @remarks
   * A new entity has no identifier yet, so it is sent without one and the backend generates it.
   *
   * @param entity - The entity to create.
   * @returns An observable with the created entity, including its generated id.
   */
  create(entity: TEntity): Observable<TEntity> {
    const resource = this.assembler.toResourceFromEntity(entity);

    const {id, ...resourceWithoutId} = resource;
    return this.http.post<TResource>(this.endpointUrl, id ? resource : resourceWithoutId).pipe(
      map(created => this.assembler.toEntityFromResource(created)),
      catchError(this.handleError('Failed to create entity'))
    );
  }

  update(entity: TEntity, id: number): Observable<TEntity> {
    const resource = this.assembler.toResourceFromEntity(entity);
    return this.http.put<TResource>(`${this.endpointUrl}/${id}`, resource).pipe(
      map(updated => this.assembler.toEntityFromResource(updated)),
      catchError(this.handleError('Failed to update entity'))
    );
  }

  /**
   * Deletes an entity of the collection.
   *
   * @param id - The identifier of the entity to delete.
   * @returns An observable that completes when the entity is deleted.
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpointUrl}/${id}`).pipe(
      catchError(this.handleError('Failed to delete entity'))
    );
  }
}
