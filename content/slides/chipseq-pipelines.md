---
title: "ChIP-seq Pipelines"
date: "2016-01-13"
draft: true
---

# Introduction


## Motivation
<!-- .element: style="margin-bottom: 0.6em;"-->

<!-- panel->(blue) -->
Need for an automated pipeline for processing **ERC** project `ChIP-seq` samples


## Former analysis
<!-- .element: style="margin-bottom: 0.6em;"-->

<!-- panel -->
<!-- .element: style="margin-bottom: 1.6em;"-->
Manual workflow including the following steps:

- mapping with `GEM`
- fragment length estimation with `SPP` (`phantompeaktools`)
- signal with `align2rawsignal` (a.k.a `WIGGLER`)


## Drawbacks
<!-- .element: style="margin-bottom: 0.6em;"-->

- Manual execution
- `align2rawsignal` requires a specific version of `MATLAB Runtime` and is unmantained
------

# Blueprint
<a href="http://dcc.blueprint-epigenome.eu/#/md/chip_seq_grch38"><h4><i class="fa fa-external-link-square"> BLUEPRINT DCC</i></h4></a>


## Workflow
<!-- .element: style="margin-bottom: 0.6em;"-->

1. [Mapping](#/BlueprintMapping)
2. [Filtering](#/BlueprintFiltering)
3. [Modelling Fragment Size](#/BlueprintModellingFragmentSize)
4. [Peak Calling](#/BlueprintPeakCalling)
5. [Wiggle Plots](#/BlueprintWigglePlots)


## Mapping
<!-- .element: style="margin-bottom: 0.6em;"-->

<!-- panel->(blue) -->
<!-- .element: style="margin-bottom: 2em;" -->
`BWA` with default parameters + low quality trimming

1. `bwa aln`
  - max edit distance **0.04**
  - trimming low quality (**<5**) reads
  - disallow long gaps
2. `bwa samse`
  - max **3** output alignments
3. mark duplicates


## Filtering
<!-- .element: style="margin-bottom: 0.6em;" -->

- exclude SAM flag `1024`
  * PCR or optical duplicates
- remove low quality (**<5**) mappings


## Modelling Fragment Size
<!-- .element: style="margin-bottom: 0.6em;"-->

<!-- panel->(blue) -->
<!-- .element: style="margin-bottom: 2em;"-->
uses `SPP` to estimate the fragment size


## Peak Calling
<!-- .element: style="margin-bottom: 0.6em;"-->

<!-- panel->(blue) -->
<!-- .element: style="margin-bottom: 2em;"-->
uses `MACS2` to estimate the fragment size using both the standard method
and the `-broad` flag depending on the mark in question

- Standard: `H3K27me3`, `H3K36me3`, `H3K9me3`, `H3K4me1`
- Broad: `H3K27ac`, `H3K4me3`, `H3K9/14ac`, `H2A.Zac`


## Wiggle Plots
<!-- .element: style="margin-bottom: 0.6em;"-->

<!-- panel->(blue) -->
<!-- .element: style="margin-bottom: 2em;"-->
uses `align2RawSignal` to produce signal plots. Sex specific
fasta and `umap` files are used.
------

# ENCODE

<h4>
[![DNAnexus pipeline](http://sra.dnanexus.com/images/dnanexus.png)<!-- .element: class="pipeline" -->](https://www.dnanexus.com/)
pipeline in development
</h4>
<a href="https://github.com/ENCODE-DCC/chip-seq-pipeline/"><i class="fa fa-github"> ENCODE DCC</i></a>



## Workflow
<!-- .element: style="margin-bottom: 0.6em;"-->

1. [Mapping](#/ENCODEMapping)
2. [Filter QC](#/ENCODEFilterQC)
3. [Xcor](#/ENCODEXcor)
4. [MACS2](#/ENCODEMACS2)
5. [IDR](#/ENCODEIDR)


## Mapping
<!-- .element: style="margin-bottom: 0.6em;"-->

<!-- panel->(blue) -->
<!-- .element: style="margin-bottom: 2em;"-->
`BWA` with default parameters

1. `bwa aln`
  - max edit distance **0.04**
  - disallow long gaps
  - no trimming
2. `bwa samse`
  - max **3** output alignments


## Filter QC
<!-- .element: style="margin-bottom: 0.6em;"-->

- exclude SAM flag `1804`
  * read unmapped
  * mate unmapped
  * secondary alignments
  * not passing platform quality check
  * PCR or optical duplicates
- mark duplicates with Picard


## Xcor
<!-- .element: style="margin-bottom: 0.6em;"-->

<!-- panel->(blue) -->
<!-- .element: style="margin-bottom: 2em;"-->
uses `SPP` to calculate cross correlation QC scores and estimate fragment size

  - create `tagAlign` file
  - create `BEDPE` file
  - subsample `tagAlign` file (15M reads)
  - run `SPP`


## MACS2
<!-- .element: style="margin-bottom: 0.6em;"-->

<!-- panel->(blue) -->
<!-- .element: style="margin-bottom: 2em;"-->
uses `MACS2` to call peaks - assumes `input` is always present

  - narrow peaks and preliminary signal tracks
  - broad and gapped peaks
  - fold enrichment signal tracks
  - `-log10(p-value)` signal tracks
  - bigWigs from beds to support `trackhub` visualization of peak files


## IDR
<!-- .element: style="margin-bottom: 0.6em;"-->

<!-- panel->(blue) -->
<!-- .element: style="margin-bottom: 2em;"-->
perform IDR analysis on replicates

  - True Replicates
  - Rep 1 Self-pseudoreplicates
  - Rep 2 Self-pseudoreplicates
  - Pooled Pseudoreplicates

<!-- panel->(green) -->
<!-- .element: style="margin-top: 2em;"-->
final peak calls
------

# RG lab  

<h4>
[![Nextflow pipeline](../img/nextflow2014_no-bg.png)<!-- .element: class="pipeline" -->](http://www.nextflow.io/)
pipeline in development
</h4>
<a href="https://github.com/guigolab"><i class="fa fa-github"> Guigo Lab</i></a>


## Workflow
<!-- .element: style="margin-bottom: 0.6em;"-->

1. [Mapping](#/CurrentImplementationMapping)
2. [Merge ](#/CurrentImplementationMerge)
3. [Model](#/CurrentImplementationModel)
4. [Peak Calling](#/CurrentImplementationPeakCalling)


## Mapping
<!-- .element: style="margin-bottom: 0.6em;"-->

<!-- panel->(blue) -->
<!-- .element: style="margin-bottom: 2em;"-->
uses the `GEM` mapper and tools

1. `gem-mapper` with default parameters
2. `gt.filter`
  - max edit distance (**2** - absolute number of bases)
3. `gt.filter`
  - max **10** output alignments
4. exclude SAM flag `256`
  - keep primary alignments only


## Merge
<!-- .element: style="margin-bottom: 0.6em;"-->

<!-- panel->(blue) -->
<!-- .element: style="margin-bottom: 2em;"-->
merge `BAM` files on metadata key and produce single output with read groups


## Model
<!-- .element: style="margin-bottom: 0.6em;"-->

<!-- panel->(blue) -->
<!-- .element: style="margin-bottom: 2em;"-->
uses `SPP` to estimate fragment size and produce cross-correlation plot


## Peak Calling
<!-- .element: style="margin-bottom: 0.6em;"-->

<!-- panel->(blue) -->
<!-- .element: style="margin-bottom: 2em;"-->
uses `MACS2` to call peaks - works with or without `input`

  - narrow peaks and preliminary signal tracks
  - broad and gapped peaks
  - pileup signal tracks
  - only with `input` present:
    - fold enrichment signal tracks
    - `-log10(p-value)` signal tracks


## Run the pipeline
<!-- .element: style="margin-bottom: 0.6em;"-->

```bash
$ nextflow run chipseq-pipeline.nf --help
```

```bash
N E X T F L O W  ~  version 0.16.2
Launching chipseq-pipeline.nf

C H I P - N F ~ ChIP-seq Pipeline
=================================
Run ChIP-seq analyses on a set of data.

Usage:
    chipseq-pipeline.nf --index TSV_FILE --genome GENOME_FILE [OPTION]...

Options:
    --help                              Show this message and exit.
    --index TSV_FILE                    Tab separated file containing information about the data.
    --genome GENOME_FILE                Reference genome file.
    --mismatches N_MISMATCHES           Allow max N_MISMATCHES error events for a read (Default: 2).
    --multimaps N_MULTIMAPS             Allow max N_MULTIMAPS mappings for a read (Default: 10).
    --rescale                           Rescale peak scores to conform to the format supported by the
                                        UCSC genome browser (score must be <1000) (Default: false).
```


## Index file
<!-- .element: style="margin-bottom: 0.6em;"-->

```bash
H024H3X1        H024H3X1_ACNNGN         /users/rg/projects/ERC/chipseq.sequences/H24X_H3_11630_ACNNGN.fastq.gz  -               H3
H024H3X1        H024H3X1_ACTTGA         /users/rg/projects/ERC/chipseq.sequences/H24X_H3_11630_ACTTGA.fastq.gz  -               H3
H024H3X1        H024H3X1_ANNNNA         /users/rg/projects/ERC/chipseq.sequences/H24X_H3_11630_ANNNNA.fastq.gz  -               H3
H024H3X1        H024H3X1_ANTTGA         /users/rg/projects/ERC/chipseq.sequences/H24X_H3_11630_ANTTGA.fastq.gz  -               H3
H000H3K4me2X1   H000H3K4me2X1_GCCAAT    /users/rg/projects/ERC/chipseq.sequences/H0X_4m2_11603_GCCAAT.fastq.gz  H000InputX1     H3K4me2
H000InputX1     H000InputX1_AGTTCC      /users/rg/projects/ERC/chipseq.sequences/input_7473_AGTTCC.fastq.gz     H000InputX1     input
```

1. identifier used for merging the BAM files
<!-- .element: style="margin-top: 2em;"-->
2. single run identifier
3. path to the fastq file to be processed
4. identifier of the input or `-` if no control is used
5. mark/histone or `input` if the line refers to a control


## Output data

- `Alignments`
- `pileupSignal`, pileup signal tracks
- `fcSignal`,  fold enrichment signal tracks
- `pvalueSignal`, **-log10(p-value)** signal tracks
- `narrowPeak`, peak locations with peak summit, pvalue and qvalue (`BED6+4`)
- `broadPeak`, similar to `narrowPeak` (`BED6+3`)
- `gappedPeak`, both narrow and broad peaks (`BED12+3`)

<!-- panel->(blue) -->
<!-- .element: style="margin-top: 1em;"-->
check [MACS2 output files](https://github.com/taoliu/MACS#output-files) for details


## Pipeline db file
<!-- .element: style="margin-bottom: 0.6em;"-->

```bash
H024H3X1        /nfs/no_backup/rg/projects/ERC/human/chipseq/nf-pipeline/work/22/f0f9f135d78955142801c95bbfb306/peakOut/H024H3X1.pileup_signal.bw         H3         255     pileupSignal
H024H3X1        /nfs/no_backup/rg/projects/ERC/human/chipseq/nf-pipeline/work/22/f0f9f135d78955142801c95bbfb306/peakOut/H024H3X1_peaks.narrowPeak         H3         255     narrowPeak
H024H3X1        /nfs/no_backup/rg/projects/ERC/human/chipseq/nf-pipeline/work/dd/bd027353586b40ff6117af0576ea4e/H024H3X1.bam                              H3         255     Alignments
H024H3X1        /nfs/no_backup/rg/projects/ERC/human/chipseq/nf-pipeline/work/22/f0f9f135d78955142801c95bbfb306/peakOut/H024H3X1_peaks.gappedPeak         H3         255     gappedPeak
H024H3X1        /nfs/no_backup/rg/projects/ERC/human/chipseq/nf-pipeline/work/22/f0f9f135d78955142801c95bbfb306/peakOut/H024H3X1_peaks.broadPeak          H3         255     broadPeak
H000H3K4me2X1   /nfs/no_backup/rg/projects/ERC/human/chipseq/nf-pipeline/work/ff/716beee56097d48f2bd174d7916db9/peakOut/H000H3K4me2X1_peaks.gappedPeak    H3K4me2    200     gappedPeak
H000H3K4me2X1   /nfs/no_backup/rg/projects/ERC/human/chipseq/nf-pipeline/work/ff/716beee56097d48f2bd174d7916db9/peakOut/H000H3K4me2X1.fc_signal.bw        H3K4me2    200     fcSignal
H000H3K4me2X1   /nfs/no_backup/rg/projects/ERC/human/chipseq/nf-pipeline/work/ff/716beee56097d48f2bd174d7916db9/peakOut/H000H3K4me2X1.pval_signal.bw      H3K4me2    200     pvalueSignal
H000H3K4me2X1   /nfs/no_backup/rg/projects/ERC/human/chipseq/nf-pipeline/work/ff/716beee56097d48f2bd174d7916db9/peakOut/H000H3K4me2X1_peaks.broadPeak     H3K4me2    200     broadPeak
H000H3K4me2X1   /nfs/no_backup/rg/projects/ERC/human/chipseq/nf-pipeline/work/ff/716beee56097d48f2bd174d7916db9/peakOut/H000H3K4me2X1.pileup_signal.bw    H3K4me2    200     pileupSignal
H000H3K4me2X1   /nfs/no_backup/rg/projects/ERC/human/chipseq/nf-pipeline/work/ff/716beee56097d48f2bd174d7916db9/peakOut/H000H3K4me2X1_peaks.narrowPeak    H3K4me2    200     narrowPeak
H000H3K4me2X1   /nfs/no_backup/rg/projects/ERC/human/chipseq/nf-pipeline/work/aa/33097530d5095386f5fc984c468fc2/H000H3K4me2X1_GCCAAT_primary.bam          H3K4me2    200     Alignments
```

1. merge identifier
<!-- .element: style="margin-top: 1em;"-->
2. path
3. mark/histone
4. estimated fragment length
5. data type

------

# Future work


## Add QC metrics
<!-- .element: style="margin-bottom: 0.6em;"-->

- read length and sequencing depth
- fraction aligned reads, duplicate reads
- fraction of reads in enriched intervals
- **other criteria**?

![](http://ihec-epigenomes.org/fileadmin/ihec/images/logo.png)
<!-- .element: style="margin-top: 2em;"-->


## Check other references
<!-- .element: style="margin-bottom: 0.6em;"-->

- [![IHEC](http://ihec-epigenomes.org/fileadmin/ihec/images/logo.png)<!-- .element: class="pipeline" style="vertical-align: baseline;" -->](http://ihec-epigenomes.org/outcomes/protocols/) protocols
- CRG Bioinformatics Unit


## Extend the workflow
<!-- .element: style="margin-bottom: 0.6em;"-->

- UCSC track hubs
  - automatically make BigWig files accessible
  - produce the UCSC track hub file
- downstream analyses
  - peak finding / transcript detection / feature identification
  - motif analysis
  - annotation of Peaks
- biological replicates
------

## Thanks!
