//package com.newSummary.service;
//
//import java.io.File;
//import java.io.FileOutputStream;
//import java.io.IOException;
//import java.util.Optional;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Component;
//import org.springframework.web.multipart.MultipartFile;
//
//import com.amazonaws.services.s3.AmazonS3Client;
//import com.amazonaws.services.s3.model.CannedAccessControlList;
//import com.amazonaws.services.s3.model.PutObjectRequest;
//import com.newSummary.domain.dto.FileUploadResponse;
//import com.newSummary.domain.entity.User;
//import com.newSummary.repository.UserRepository;
//
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//
//@Slf4j
//@RequiredArgsConstructor
//@Component
//public class S3Uploader {
//	
//	private final AmazonS3Client amazonS3Client;
//	private final UserRepository userRepository;
//
//	@Value("${cloud.aws.s3.bucket}")
//	private String bucket;
//
//	public FileUploadResponse upload(String userEmail, MultipartFile multipartFile, String dirName) throws IOException {
//
//
//		File uploadFile = convert(multipartFile)
//			.orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File로 전환이 실패했습니다."));
//
//		return upload(userEmail, uploadFile, dirName);
//	}
//
//
//	private FileUploadResponse upload(String userEmail, File uploadFile, String dirName) {
//		String fileName = dirName + "/" + uploadFile.getName();
//		String uploadImageUrl = putS3(uploadFile, fileName);
//		removeNewFile(uploadFile);
//
////사용자의 프로필을 등록하는 것이기때문에, User 도메인에 setProfile을 해주는 코드.
////이 부분은 그냥 업로드만 필요하다면 필요없는 부분이다.
//		User user = userRepository.findByUserEmail(userEmail).get();
//		user.set(uploadImageUrl);
//
////FileUploadResponse DTO로 반환해준다.
//		return new FileUploadResponse(fileName, uploadImageUrl);
//		//return uploadImageUrl;
//	}
//
//	private String putS3(File uploadFile, String fileName) {
//		amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, uploadFile).withCannedAcl(
//			CannedAccessControlList.PublicRead));
//		return amazonS3Client.getUrl(bucket, fileName).toString();
//	}
//
//	private void removeNewFile(File targetFile) {
//		if (targetFile.delete()) {
//			log.info("파일이 삭제되었습니다.");
//		} else {
//			log.info("파일이 삭제되지 못했습니다.");
//		}
//	}
//
//	private Optional<File> convert(MultipartFile file) throws IOException {
//		File convertFile = new File(file.getOriginalFilename());
//		if(convertFile.createNewFile()) {
//			try (FileOutputStream fos = new FileOutputStream(convertFile)) {
//				fos.write(file.getBytes());
//			}
//			return Optional.of(convertFile);
//		}
//
//		return Optional.empty();
//	}
//}
