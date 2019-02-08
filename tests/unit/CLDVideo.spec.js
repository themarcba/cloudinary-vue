import Vue from "vue";
import { mount } from "@vue/test-utils";
import CLDVideo from "../../src/components/CLDVideo.vue";

describe("CLDVideo", () => {
  function sourcesOfVideo(element) {
    const sources = element.findAll("source");
    const result = {};
    for (let i = 0; i < sources.length; i++) {
      result[sources.at(i).attributes("mimetype")] = sources
        .at(i)
        .attributes("src");
    }
    return result;
  }

  it("renders", async () => {
    const video = mount({
      template: `
        <CLDVideo cloudName="demo" publicId="face_top" />
      `,
      components: { CLDVideo }
    });

    await new Promise(r => Vue.nextTick(() => r()));

    expect(video.is("video")).toBe(true);
    expect(sourcesOfVideo(video)).toEqual({
      "video/webm": "http://res.cloudinary.com/demo/video/upload/face_top.webm",
      "video/mp4": "http://res.cloudinary.com/demo/video/upload/face_top.mp4",
      "video/ogg": "http://res.cloudinary.com/demo/video/upload/face_top.ogv"
    });
  });

  it("allows transformation as props", async () => {
    const video = mount({
      template: `
        <CLDVideo cloudName="demo" publicId="face_top" effect="sepia" />
      `,
      components: { CLDVideo }
    });

    await new Promise(r => Vue.nextTick(() => r()));

    expect(video.is("video")).toBe(true);
    expect(sourcesOfVideo(video)).toEqual({
      "video/webm":
        "http://res.cloudinary.com/demo/video/upload/e_sepia/face_top.webm",
      "video/mp4":
        "http://res.cloudinary.com/demo/video/upload/e_sepia/face_top.mp4",
      "video/ogg":
        "http://res.cloudinary.com/demo/video/upload/e_sepia/face_top.ogv"
    });
  });

  it("bypasses non-cloudinary attributes", async () => {
    const video = mount({
      template: `
        <CLDVideo cloudName="demo" publicId="face_top" aria-hidden="true" />
      `,
      components: { CLDVideo }
    });

    await new Promise(r => Vue.nextTick(() => r()));

    expect(video.is("video")).toBe(true);
    expect(video.attributes("aria-hidden")).toBe("true");
    expect(video.attributes("cloudName")).toBe(undefined);
  });

  it("should render a video without sources if publicId is not defined", async () => {
    const video = mount({
      template: `
        <CLDVideo cloudName="demo" publicId="" />
      `,
      components: { CLDVideo }
    });

    await new Promise(r => Vue.nextTick(() => r()));

    expect(video.is("video")).toBe(true);
    expect(sourcesOfVideo(video)).toEqual({});
  });

  it("respects simple poster attribute", async () => {
    const video = mount({
      template: `
        <CLDVideo cloudName="demo" publicId="face_top" poster="zxc" />
      `,
      components: { CLDVideo }
    });

    await new Promise(r => Vue.nextTick(() => r()));

    expect(video.is("video")).toBe(true);
    expect(video.attributes("poster")).toBe("zxc");
  });

  it("respects poster object-attribute", async () => {
    const video = mount({
      template: `
        <CLDVideo
          cloudName="demo"
          publicId="face_top"
          :poster="{ publicId: 'small_dinosaur', effect: 'blur' }"
        />
      `,
      components: { CLDVideo }
    });

    await new Promise(r => Vue.nextTick(() => r()));

    expect(video.is("video")).toBe(true);
    expect(video.attributes("poster")).toBe(
      "http://res.cloudinary.com/demo/image/upload/e_blur/small_dinosaur"
    );
  });

  it("will contain default poster if no poster data is provided", async () => {
    const video = mount({
      template: `
        <CLDVideo
          cloudName="demo"
          publicId="face_top"
        />
      `,
      components: { CLDVideo }
    });

    await new Promise(r => Vue.nextTick(() => r()));

    expect(video.is("video")).toBe(true);
    expect(video.attributes("poster")).toBe(
      "http://res.cloudinary.com/demo/image/upload/face_top"
    );
  });
});
