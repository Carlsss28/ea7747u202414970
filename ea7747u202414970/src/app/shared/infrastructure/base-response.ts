
/**
 * Base contract for a resource, the raw JSON object exchanged with an API provider.
 *
 * @author Carla Gallardo
 */
export interface BaseResource {
  /**
   * Unique identifier of the resource.
   */
  id: number;
}

/**
 * Base contract for a response envelope returned by an API provider.
 *
 * @remarks
 * Concrete responses extend it to describe the attributes that wrap their resources.
 *
 * @author Carla Gallardo
 */
export interface BaseResponse {}
