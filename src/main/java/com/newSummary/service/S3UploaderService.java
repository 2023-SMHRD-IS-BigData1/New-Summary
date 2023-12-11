package com.newSummary.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.newSummary.domain.dto.FileUploadResponse;
import com.newSummary.domain.entity.Board;
import com.newSummary.domain.entity.User;
import com.newSummary.repository.BoardRepository;
import com.newSummary.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class S3UploaderService {
	
	private final AmazonS3Client amazonS3Client;
	private final UserRepository userRepository;
	private final BoardRepository boardRepository;

	@Value("${cloud.aws.s3.bucket}")
	private String bucket;
	
	// 파일 업로드 메소드 multipartFile -> File로 변환하고, 변환된 파일과 다른 정보를 이용하여 실제 업로드 수행
	public FileUploadResponse upload(String userEmail, MultipartFile multipartFile, String dirName) throws IOException {


		File uploadFile = convert(multipartFile)
			.orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File로 전환이 실패했습니다."));

		return upload(userEmail, uploadFile, dirName);
	}
	// S3에 파일을 업로드하고, 업로드된 파일의 URL을 생성하여, 사용자 프로필 이미지 URL 업데이트
	private FileUploadResponse upload(String userEmail, File uploadFile, String dirName) {
		String fileName = dirName + "/" + uploadFile.getName();
		String uploadImageUrl = putS3(uploadFile, fileName);
		removeNewFile(uploadFile);

		//사용자의 프로필을 등록하는 것이기때문에, User 도메인에 setProfile을 해주는 코드.
		User user = userRepository.findByUserEmail(userEmail).get();
		user.setUserProfile(uploadImageUrl);
		this.userRepository.save(user);
		//FileUploadResponse DTO로 반환해준다.
		return new FileUploadResponse(fileName, uploadImageUrl);
		//return uploadImageUrl;
	}
	public FileUploadResponse updateProfile(String userEmail, MultipartFile newProfile, String dirName) throws IOException {
	    // 현재 사용자의 프로필 정보 조회
	    User user = userRepository.findByUserEmail(userEmail)
	            .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

	    // 현재 프로필 이미지의 파일 이름 가져오기
	    String currentFileName = extractFileNameFromUrl(user.getUserProfile());

	    // 기존 파일 삭제
	    deleteFileFromS3(currentFileName);

	    // 새로운 파일 업로드
	    File newUploadFile = convert(newProfile)
	            .orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File로 전환이 실패했습니다."));
	    String newFileName = dirName + "/" + newUploadFile.getName();
	    String newUploadImageUrl = putS3(newUploadFile, newFileName);
	    removeNewFile(newUploadFile);

	    // 데이터베이스에 새로운 프로필 이미지 URL 업데이트
	    user.setUserProfile(newUploadImageUrl);
	    userRepository.save(user);

	    return new FileUploadResponse(newFileName, newUploadImageUrl);
	}
	// 게시물 멀티파일 파일로 변환
	public FileUploadResponse boardUpload(String userEmail, MultipartFile multipartFile, String dirname) throws IOException {
		File uploadFile = convert(multipartFile)
				.orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File로 전환이 실패했습니다."));

			return boardUpload(userEmail, uploadFile, dirname);
	}
	
	// 게시물 파일 업로드
	private FileUploadResponse boardUpload(String userEmail, File uploadFile, String dirName) {
		String fileName = dirName + "/" + uploadFile.getName();
		String uploadImageUrl = putS3(uploadFile, fileName);
		removeNewFile(uploadFile);
		//FileUploadResponse DTO로 반환해준다.
		return new FileUploadResponse(fileName, uploadImageUrl);
		//return uploadImageUrl;
	}
	// 게시물 파일 수정
	public FileUploadResponse updateBoardProfile(Long bdIdx, MultipartFile newProfile, String dirName) throws IOException {
	    // 현재 사용자의 프로필 정보 조회
	    Board board = boardRepository.findBybdIdx(bdIdx).get();
	    // 현재 프로필 이미지의 파일 이름 가져오기
	    String currentFileName = extractFileNameFromUrl(board.getBdProfile());

	    // 기존 파일 삭제
	    deleteFileFromS3(currentFileName);

	    // 새로운 파일 업로드
	    File newUploadFile = convert(newProfile)
	            .orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File로 전환이 실패했습니다."));
	    String newFileName = dirName + "/" + newUploadFile.getName();
	    String newUploadImageUrl = putS3(newUploadFile, newFileName);
	    removeNewFile(newUploadFile);

	    // 데이터베이스에 새로운 게시판 이미지 URL 업데이트
	    board.setBdProfile(newUploadImageUrl);
	    boardRepository.save(board);
	    return new FileUploadResponse(newFileName, newUploadImageUrl);
	}
	
	// S3에 파일을 업로드하고, URL반환하는 메소드
	private String putS3(File uploadFile, String fileName) {
		amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, uploadFile).withCannedAcl(
			CannedAccessControlList.PublicRead));
		return amazonS3Client.getUrl(bucket, fileName).toString();
	}
	// 업로드 완료 후 생성된 임시파일 삭제
	private void removeNewFile(File targetFile) {
		if (targetFile.delete()) {
			log.info("파일이 삭제되었습니다.");
		} else {
			log.info("파일이 삭제되지 못했습니다.");
		}
	}
	// MultipartFile을 File로 변환하는 메소드
	private Optional<File> convert(MultipartFile file) throws IOException {
		File convertFile = new File(file.getOriginalFilename());
		if(convertFile.createNewFile()) {
			try (FileOutputStream fos = new FileOutputStream(convertFile)) {
				fos.write(file.getBytes());
			}
			return Optional.of(convertFile);
		}

		return Optional.empty();
	}
	// S3에서 파일 삭제 메서드
	public void deleteFileFromS3(String fileName) {
	    amazonS3Client.deleteObject(bucket, fileName);
	}
	// URL에서 파일 이름 추출 메서드
	public String extractFileNameFromUrl(String url) {
	    int lastSlashIndex = url.lastIndexOf('/');
	    if (lastSlashIndex != -1 && lastSlashIndex < url.length() - 1) {
	        return url.substring(lastSlashIndex + 1);
	    } else {
	        // 적절한 파일 이름을 추출할 수 없는 경우 예외처리 또는 기본값을 반환할 수 있습니다.
	        throw new IllegalArgumentException("URL에서 파일 이름을 추출할 수 없습니다.");
	    }
	}
}
