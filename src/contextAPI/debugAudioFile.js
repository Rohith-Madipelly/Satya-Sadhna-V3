import * as FileSystem from 'expo-file-system';

// Debug utility to help troubleshoot file path issues
export const debugAudioFile = async (track) => {
  console.log('🔍 === DEBUGGING AUDIO FILE ===');
  console.log('🔍 Original track object:', track);
  
  const audioUrl = track.url || track.audioUrl;
  console.log('🔍 Audio URL:', audioUrl);
  
  if (!audioUrl) {
    console.error('❌ No audio URL found in track object');
    return { isValid: false, error: 'No audio URL found' };
  }
  
  try {
    // Check if it's a local file path
    if (audioUrl.startsWith('file://')) {
      const cleanPath = audioUrl.replace('file://', '');
      console.log('🔍 Clean file path:', cleanPath);
      
      // Get file info
      const fileInfo = await FileSystem.getInfoAsync(cleanPath);
      console.log('🔍 File info:', fileInfo);
      
      if (!fileInfo.exists) {
        console.error('❌ File does not exist at path:', cleanPath);
        
        // Try to list the directory to see what's available
        try {
          const directory = cleanPath.substring(0, cleanPath.lastIndexOf('/'));
          console.log('🔍 Checking directory:', directory);
          
          const dirInfo = await FileSystem.getInfoAsync(directory);
          if (dirInfo.exists && dirInfo.isDirectory) {
            const files = await FileSystem.readDirectoryAsync(directory);
            console.log('🔍 Files in directory:', files);
          } else {
            console.error('❌ Directory does not exist:', directory);
          }
        } catch (dirError) {
          console.error('❌ Error checking directory:', dirError);
        }
        
        return { isValid: false, error: 'File does not exist' };
      }
      
      if (fileInfo.isDirectory) {
        console.error('❌ Path points to a directory, not a file');
        return { isValid: false, error: 'Path is a directory' };
      }
      
      console.log('✅ File exists and is valid');
      console.log('📏 File size:', fileInfo.size, 'bytes');
      
      return { 
        isValid: true, 
        fileInfo,
        cleanPath,
        originalUrl: audioUrl 
      };
      
    } else if (audioUrl.startsWith('http')) {
      console.log('🌐 Remote URL detected:', audioUrl);
      return { 
        isValid: true, 
        isRemote: true,
        originalUrl: audioUrl 
      };
      
    } else {
      console.log('🔍 Relative or other path format:', audioUrl);
      
      // Try different path combinations
      const possiblePaths = [
        `${FileSystem.documentDirectory}${audioUrl}`,
        `${FileSystem.cacheDirectory}${audioUrl}`,
        `file://${FileSystem.documentDirectory}${audioUrl}`,
        `file://${FileSystem.cacheDirectory}${audioUrl}`,
      ];
      
      console.log('🔍 Trying possible paths:', possiblePaths);
      
      for (const path of possiblePaths) {
        try {
          const info = await FileSystem.getInfoAsync(path.replace('file://', ''));
          if (info.exists) {
            console.log('✅ Found file at:', path);
            return { 
              isValid: true, 
              fileInfo: info,
              cleanPath: path.replace('file://', ''),
              originalUrl: audioUrl,
              correctedUrl: path
            };
          }
        } catch (error) {
          // Continue to next path
        }
      }
      
      console.error('❌ File not found in any expected location');
      return { isValid: false, error: 'File not found in expected locations' };
    }
    
  } catch (error) {
    console.error('❌ Error during file validation:', error);
    return { isValid: false, error: error.message };
  }
};

// Utility to list all files in common audio directories
export const listAudioFiles = async () => {
  console.log('🔍 === LISTING AUDIO FILES ===');
  
  const directories = [
    { name: 'Document Directory', path: FileSystem.documentDirectory },
    { name: 'Cache Directory', path: FileSystem.cacheDirectory },
  ];
  
  for (const dir of directories) {
    try {
      console.log(`🔍 Checking ${dir.name}: ${dir.path}`);
      
      const info = await FileSystem.getInfoAsync(dir.path);
      if (info.exists && info.isDirectory) {
        const files = await FileSystem.readDirectoryAsync(dir.path);
        
        // Filter for audio files
        const audioFiles = files.filter(file => 
          file.toLowerCase().endsWith('.mp3') ||
          file.toLowerCase().endsWith('.wav') ||
          file.toLowerCase().endsWith('.m4a') ||
          file.toLowerCase().endsWith('.aac')
        );
        
        console.log(`🎵 Audio files found in ${dir.name}:`, audioFiles);
        
        // Get details for each audio file
        for (const audioFile of audioFiles) {
          try {
            const filePath = `${dir.path}${audioFile}`;
            const fileInfo = await FileSystem.getInfoAsync(filePath);
            console.log(`📄 ${audioFile}:`, {
              size: fileInfo.size,
              modificationTime: new Date(fileInfo.modificationTime * 1000),
              fullPath: filePath
            });
          } catch (fileError) {
            console.error(`❌ Error getting info for ${audioFile}:`, fileError);
          }
        }
      } else {
        console.log(`⚠️ ${dir.name} does not exist or is not a directory`);
      }
    } catch (error) {
      console.error(`❌ Error accessing ${dir.name}:`, error);
    }
  }
};

// Utility to fix common file path issues
export const fixAudioFilePath = (originalPath) => {
  if (!originalPath) return null;
  
  // If it's already a proper file:// URL, return as is
  if (originalPath.startsWith('file://') && originalPath.includes(FileSystem.documentDirectory.replace('file://', ''))) {
    return originalPath;
  }
  
  // If it's just a filename, try common locations
  if (!originalPath.includes('/')) {
    const possiblePaths = [
      `${FileSystem.documentDirectory}${originalPath}`,
      `${FileSystem.cacheDirectory}${originalPath}`,
    ];
    return possiblePaths;
  }
  
  // If it's a relative path, try with common prefixes
  if (!originalPath.startsWith('file://') && !originalPath.startsWith('http')) {
    return [
      `${FileSystem.documentDirectory}${originalPath}`,
      `${FileSystem.cacheDirectory}${originalPath}`,
      `file://${FileSystem.documentDirectory}${originalPath}`,
      `file://${FileSystem.cacheDirectory}${originalPath}`,
    ];
  }
  
  return originalPath;
};