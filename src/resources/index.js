import * as THREE from 'three'
import flat from 'lodash-es/flatten'
import { SVGLoader } from './SVGLoader'

const names = ['rudy', 'hana', 'noah', 'tom']
const deg = THREE.Math.degToRad
const loaders = names
  .map(
    name =>
      `https://raw.githubusercontent.com/drcmda/react-three-fiber/master/examples/resources/images/svg/${name}.svg`,
  )
  .map(
    url =>
      new Promise(resolve =>
        new SVGLoader().load(url, shapes =>
          resolve(
            flat(
              shapes.map((group, index) => group.toShapes(true).map(shape => ({ shape, color: group.color, index }))),
            ),
          ),
        ),
      ),
  )

export { names, deg, loaders }
