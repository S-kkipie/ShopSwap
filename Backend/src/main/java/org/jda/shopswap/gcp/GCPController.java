package org.jda.shopswap.gcp;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping(path = "/gcp")
@RequiredArgsConstructor
public class GCPController {
    private final GCPService gcpService;

    @PostMapping
    public String uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
        String fileName = file.getOriginalFilename();
        return gcpService.uploadFile(file, fileName);
    }
}
