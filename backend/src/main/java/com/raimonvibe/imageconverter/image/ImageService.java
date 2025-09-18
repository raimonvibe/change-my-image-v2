package com.raimonvibe.imageconverter.image;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;
import java.util.UUID;

public class ImageService {

  public record ConversionOptions(String format, Integer quality) {}

  public File convert(File input, ConversionOptions options) throws IOException, InterruptedException {
    String outExt = options.format().toLowerCase();
    File out = Files.createTempFile("conv-" + UUID.randomUUID(), "." + outExt).toFile();
    ProcessBuilder pb;
    if (options.quality() != null) {
      pb = new ProcessBuilder("convert", input.getAbsolutePath(), "-quality", String.valueOf(options.quality()), out.getAbsolutePath());
    } else {
      pb = new ProcessBuilder("convert", input.getAbsolutePath(), out.getAbsolutePath());
    }
    pb.redirectErrorStream(true);
    Process p = pb.start();
    int code = p.waitFor();
    if (code != 0 || !out.exists()) {
      throw new IOException("Conversion failed with code " + code);
    }
    return out;
  }

  public static List<String> supportedFormats() {
    return List.of("jpg","jpeg","png","webp","avif","heic","tiff","bmp","gif","svg");
  }
}