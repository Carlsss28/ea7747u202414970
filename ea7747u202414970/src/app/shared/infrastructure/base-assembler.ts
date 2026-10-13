import {BaseEntity} from '../domain/model/base-entity';
import {BaseResource, BaseResponse} from './base-response';


/**
 * Base contract for assemblers, the objects that translate between
 * infrastructure resources and domain entities.
 *
 * @remarks
 * Keeping this translation in one place means the naming used by an API provider
 * never leaks into the domain entities.
 *
 * @typeParam TEntity - The domain entity type.
 * @typeParam TResource - The resource type exchanged with the API.
 * @typeParam TResponse - The response envelope type returned by the API.
 *
 * @author Carla Gallardo
 */
export interface BaseAssembler<
  TEntity extends BaseEntity,
  TResource extends BaseResource,
  TResponse extends BaseResponse
> {
  /**
   * Converts a resource into a domain entity.
   *
   * @param resource - The resource received from the API.
   * @returns The equivalent domain entity.
   */
  toEntityFromResource(resource: TResource): TEntity;

  /**
   * Converts a domain entity into a resource.
   *
   * @param entity - The domain entity to send to the API.
   * @returns The equivalent resource.
   */
  toResourceFromEntity(entity: TEntity): TResource;

  /**
   * Converts a response envelope into a list of domain entities.
   *
   * @param response - The response envelope received from the API.
   * @returns The domain entities contained in the response.
   */
  toEntitiesFromResponse(response: TResponse): TEntity[];
}
