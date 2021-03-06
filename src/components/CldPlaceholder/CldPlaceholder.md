### Attributes

Refer to the base [Cloudinary JS SDK](https://github.com/cloudinary/cloudinary_js#configuration) for configuration options.

See the [Image transformation reference](https://cloudinary.com/documentation/image_transformation_reference) documentation for all the options accepted by the `CldImage` and `CldTransformation` components.


### Usage

```jsx
<cld-image cloudName="demo" publicId="small_dinosaur">
  <cld-placeholder type="predominant-color"></cld-placeholder>
</cld-image>
```

### Lazy mode
Set the `loading` property to `lazy` to only load the image when it needs to be displayed instead of when the page first loads.
The placeholder will be pre-rendered but the original image will only be loaded when it's in the viewport

```vue
<template>
  <cld-image
    cloudName="demo"
    publicId="small_dinosaur"
    loading="lazy"
    placeholder="color"
    @load.native="alert"
  >
    <cld-transformation crop="scale" :height="300" />
    <cld-placeholder type="blur"></cld-placeholder>
  </cld-image>
</template>

<script>
export default {
  methods: {
    alert() {
      console.log("lazy image loaded");
    }
  }
};
</script>
```
